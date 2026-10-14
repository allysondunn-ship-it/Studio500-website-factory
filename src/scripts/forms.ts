/**
 * Progressive enhancement for .s5-form forms: inline validation with
 * accessible error messages, then a JSON POST to the configured endpoint.
 */

const messages = {
  required: (label: string) => `Please enter ${label.toLowerCase()}.`,
  select: (label: string) => `Please choose ${label.toLowerCase()}.`,
  email: 'Please enter a valid email address, like name@example.com.',
  url: 'Please enter a full web address, like https://example.com.',
  tel: 'Please enter a valid phone number.',
};

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function labelFor(field: Field): string {
  const label = field.form?.querySelector(`label[for="${field.id}"]`);
  return (label?.childNodes[0]?.textContent ?? field.name).trim();
}

function validate(field: Field): string {
  const value = field.value.trim();
  if (field.required && !value) {
    return field instanceof HTMLSelectElement ? messages.select(labelFor(field)) : messages.required(labelFor(field));
  }
  if (!value) return '';
  if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return messages.email;
  if (field.type === 'url') {
    // Be forgiving: "example.com" is accepted and normalised to https://example.com.
    const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
      const u = new URL(candidate);
      if (!u.hostname.includes('.')) return messages.url;
    } catch {
      return messages.url;
    }
  }
  if (field.type === 'tel' && value.replace(/\D/g, '').length < 7) return messages.tel;
  return '';
}

function showError(field: Field, message: string) {
  const el = field.form?.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (!el) return;
  el.textContent = message;
  el.classList.toggle('hidden', !message);
  el.classList.toggle('flex', Boolean(message));
}

function setStatus(form: HTMLFormElement, kind: 'error' | 'info', html: string) {
  const status = form.querySelector<HTMLElement>('[data-status]');
  if (!status) return;
  status.innerHTML = `<div class="rounded-ui px-4 py-3 text-sm leading-relaxed ${
    kind === 'error' ? 'bg-[#fdecec] text-[#8a1c22] ring-1 ring-[#f3c4c6]' : 'bg-muted text-ink'
  }">${html}</div>`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export function initForms() {
  document.querySelectorAll<HTMLFormElement>('form.s5-form').forEach((form) => {
    if (form.dataset.ready) return;
    form.dataset.ready = 'true';

    const fields = Array.from(form.querySelectorAll<Field>('input[name]:not([type=hidden]):not([name=_gotcha]), textarea[name], select[name]'));

    // Validate a field when the visitor leaves it, and clear errors as they fix them.
    fields.forEach((field) => {
      field.addEventListener('blur', () => field.value && showError(field, validate(field)));
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') showError(field, validate(field));
      });
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      form.querySelector('[data-status]')!.innerHTML = '';

      let firstInvalid: Field | null = null;
      for (const field of fields) {
        const msg = validate(field);
        showError(field, msg);
        if (msg && !firstInvalid) firstInvalid = field;
      }
      if (firstInvalid) {
        setStatus(form, 'error', 'Please fix the highlighted fields and try again.');
        firstInvalid.focus();
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
      if (data._gotcha) return; // Bot — silently ignore.
      delete data._gotcha;
      const urlField = fields.find((f) => f.type === 'url');
      if (urlField && data[urlField.name] && !/^https?:\/\//i.test(data[urlField.name])) {
        data[urlField.name] = `https://${data[urlField.name]}`;
      }

      const endpoint = form.dataset.endpoint;
      const email = form.dataset.fallbackEmail;
      const emailLink = email ? ` Please email us at <a class="underline" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a> instead.` : '';

      if (!endpoint) {
        setStatus(
          form,
          'error',
          `<strong>This form isn't connected yet.</strong> Your message was not sent.${emailLink}`,
        );
        console.warn('[Studio500] PUBLIC_FORM_ENDPOINT is not set — see docs/SETUP.md.');
        return;
      }

      const button = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
      const label = button.querySelector('[data-label]')!;
      const original = label.textContent;
      button.disabled = true;
      label.textContent = 'Sending…';

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const success = form.parentElement?.querySelector<HTMLElement>('[data-success]');
        form.reset();
        if (success) {
          form.hidden = true;
          success.hidden = false;
          success.focus();
        } else {
          setStatus(form, 'info', 'Thank you — your message was sent.');
        }
      } catch (err) {
        console.error(err);
        setStatus(form, 'error', `<strong>Sorry, something went wrong sending your message.</strong> Please try again in a moment.${emailLink}`);
      } finally {
        button.disabled = false;
        label.textContent = original;
      }
    });
  });
}
