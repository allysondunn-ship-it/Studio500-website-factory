# Launch checklist

Things that are placeholders or business decisions only you can make. The
website shouldn't go live until each one is confirmed.

## Must fix
- [ ] **Brand name.** "Studio500" is a placeholder (`src/config/studio.ts`).
- [ ] **Email address.** `hello@studio500.example` is a placeholder on a reserved domain.
- [ ] **Domain and `SITE_URL`.** Without them, canonical links and the sitemap point to `studio500.example`.
- [ ] **Contact form.** Connect it with `PUBLIC_FORM_ENDPOINT` (see SETUP.md) and send a test message.
- [ ] **Privacy notice.** `/privacy` is a plain-language draft. Have it reviewed and name your form and hosting providers.
- [ ] **Client editing.** The site promises a visual editor on the Managed Hosting and Concierge plans. That editor isn't set up yet (see CMS.md). Don't sell those plans until it works, or adjust the wording.

## Promises in the copy to confirm (edit `src/content/studio500/site.ts`)
- [ ] The "free, no-obligation preview".
- [ ] "If you later want to move on, we'll hand over your website files" (on hosting plans).
- [ ] "We never sell your information."
- [ ] The definition of a "small content update", and what happens to unused updates.
- [ ] Domain help: "we'll help connect the domain you already own".
- [ ] Monthly prices ($29 and $79) were described as *proposed*. Confirm them in `src/config/pricing.ts`.
- [ ] Whether to state a page limit or turnaround time for the $500 package. Neither is stated today.
- [ ] Billing terms for monthly plans (contract length, cancellation). Not stated today.

## Nice to have
- [ ] A real logo (the current mark is typographic).
- [ ] Analytics, for example Cloudflare Web Analytics, which is free and cookie-free.
- [ ] Replace sample concepts with real projects once you have permission from clients.
- [ ] Add real testimonials only once you have them, and with permission.
