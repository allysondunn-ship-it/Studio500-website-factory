import type { SiteInput } from '@/schema/site';

/** Every sample concept carries this banner so it can't be mistaken for a real business. */
export const sampleBanner = (name: string): SiteInput['banner'] => ({
  text: `Sample concept by Studio500 — ${name} is a fictional business.`,
  link: { label: 'Back to Studio500', href: '/#work' },
});

export const sampleFooterLegal = 'Fictional business shown as a Studio500 design sample.';

export const simpleContactFields: NonNullable<Extract<SiteInput['pages'][number]['sections'][number], { type: 'contact' }>['fields']> = [
  { name: 'name', label: 'Your name', type: 'text', required: true, autocomplete: 'name', width: 'half' },
  { name: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel', width: 'half' },
  { name: 'email', label: 'Email address', type: 'email', required: true, autocomplete: 'email' },
  { name: 'message', label: 'How can we help?', type: 'textarea', required: true },
];
