import type { SiteInput } from '@/schema/site';
import { themes } from '@/themes/presets';
import { sampleBanner, sampleFooterLegal, simpleContactFields } from './_shared';

const name = 'Harbor Plumbing & Heating';
const phone = '(555) 010-0142';

export const harborPlumbing: SiteInput = {
  business: { name, tagline: 'Licensed local plumbers', industry: 'home-services', phone, email: 'hello@harbor.example', address: '100 Example Street, Anytown' },
  theme: themes.harbor,
  banner: sampleBanner(name),
  seo: { titleTemplate: `%s · ${name}`, defaultDescription: 'Sample home-services website concept.' },
  navigation: {
    links: [
      { label: 'Services', href: '#services' },
      { label: 'About', href: '#about' },
      { label: 'Hours', href: '#hours' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: { label: `Call ${phone}`, href: 'tel:5550100142' },
  },
  footer: {
    blurb: 'Plumbing and heating repairs, installations and maintenance for homes in Anytown and surrounding areas.',
    columns: [{ heading: 'Explore', links: [{ label: 'Services', href: '#services' }, { label: 'Hours', href: '#hours' }, { label: 'Contact', href: '#contact' }] }],
    legal: sampleFooterLegal,
  },
  pages: [
    {
      slug: '',
      title: `${name} — Sample concept`,
      description: 'A Studio500 sample concept for a home-services business.',
      noindex: true,
      sections: [
        {
          type: 'hero',
          variant: 'split',
          eyebrow: 'Plumbing · Heating · Water heaters',
          heading: 'Reliable plumbing, fixed right the first time.',
          headingAccent: 'fixed right',
          intro: 'Upfront pricing, tidy work and a real person on the phone. Serving Anytown homes with repairs, installations and maintenance.',
          primaryCta: { label: 'Request a quote', href: '#contact' },
          secondaryCta: { label: `Call ${phone}`, href: 'tel:5550100142' },
          highlights: ['Licensed & insured', 'Upfront pricing', 'Emergency call-outs'],
          image: { alt: 'Plumber repairing a kitchen sink', placeholder: 'Team at work' },
          badge: { label: 'Same-day service', value: 'Mon – Sat', note: 'Call before noon' },
        },
        {
          type: 'services',
          id: 'services',
          eyebrow: 'Services',
          heading: 'What we can help with.',
          intro: 'Sample prices shown. Every job is quoted before work begins.',
          items: [
            { icon: 'wrench', name: 'Leak repairs', description: 'Dripping taps, burst pipes and hidden leaks found and fixed.', price: 'From $95' },
            { icon: 'shield', name: 'Water heaters', description: 'Repair, replacement and annual servicing for tank and tankless units.', price: 'From $149' },
            { icon: 'sparkles', name: 'Drain cleaning', description: 'Blocked sinks, showers and main lines cleared quickly and cleanly.', price: 'From $120' },
            { icon: 'clock', name: 'Emergency call-outs', description: 'Urgent problems handled fast, including evenings and weekends.', price: 'Call for rates' },
          ],
        },
        {
          type: 'split',
          id: 'about',
          tone: 'muted',
          eyebrow: 'About us',
          heading: 'A local team that treats your home like our own.',
          body: ['This paragraph is sample text. On a real website, it would tell the business’s story — how long they’ve been operating, who’s on the team, and what makes them different.'],
          bullets: ['Shoe covers and drop cloths on every job', 'Clear, written quotes', 'Workmanship guarantee'],
          image: { alt: 'The Harbor Plumbing team', placeholder: 'Team photo' },
          imageSide: 'left',
          cta: { label: 'Get in touch', href: '#contact' },
        },
        {
          type: 'testimonials',
          eyebrow: 'Reviews',
          heading: 'What customers say.',
          items: [
            { quote: 'Real customer reviews will appear here once the business shares them.', name: 'Customer name', detail: 'Neighbourhood', placeholder: true },
            { quote: 'Reviews can be added and edited by the business owner in the visual editor.', name: 'Customer name', detail: 'Neighbourhood', placeholder: true },
            { quote: 'We never write or invent reviews on a client’s behalf.', name: 'Customer name', detail: 'Neighbourhood', placeholder: true },
          ],
        },
        {
          type: 'hours',
          id: 'hours',
          tone: 'muted',
          eyebrow: 'Visit or call',
          heading: 'Opening hours',
          hours: [
            { day: 'Monday – Friday', hours: '7:00am – 6:00pm' },
            { day: 'Saturday', hours: '8:00am – 2:00pm' },
            { day: 'Sunday', hours: 'Emergencies only' },
          ],
          address: '100 Example Street, Anytown',
          phone,
          note: 'Holiday hours may vary.',
        },
        {
          type: 'contact',
          id: 'contact',
          eyebrow: 'Contact',
          heading: 'Request a free quote.',
          intro: 'Tell us what’s going on and we’ll get back to you with a quote.',
          formName: 'quote-request',
          submitLabel: 'Request quote',
          fields: simpleContactFields,
          details: [{ icon: 'phone', label: 'Phone', value: phone, href: 'tel:5550100142' }],
        },
      ],
    },
  ],
};
