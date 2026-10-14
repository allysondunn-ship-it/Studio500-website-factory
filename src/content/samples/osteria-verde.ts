import type { SiteInput } from '@/schema/site';
import { themes } from '@/themes/presets';
import { sampleBanner, sampleFooterLegal, simpleContactFields } from './_shared';

const name = 'Osteria Verde';

export const osteriaVerde: SiteInput = {
  business: { name, industry: 'restaurant', phone: '(555) 010-0133', address: '8 Placeholder Lane, Anytown' },
  theme: themes.trattoria,
  banner: sampleBanner(name),
  seo: { titleTemplate: `%s · ${name}`, defaultDescription: 'Sample restaurant website concept.' },
  navigation: {
    links: [
      { label: 'Menu', href: '#menu' },
      { label: 'Story', href: '#story' },
      { label: 'Hours', href: '#hours' },
    ],
    cta: { label: 'Reserve a table', href: '#contact' },
  },
  footer: { blurb: 'Seasonal Italian cooking, fresh pasta and natural wine.', columns: [], legal: sampleFooterLegal },
  pages: [
    {
      slug: '',
      title: `${name} — Sample concept`,
      description: 'A Studio500 sample concept for a restaurant.',
      noindex: true,
      sections: [
        {
          type: 'hero',
          variant: 'split',
          eyebrow: 'Neighbourhood osteria',
          heading: 'Fresh pasta, made by hand every morning.',
          headingAccent: 'made by hand',
          intro: 'Seasonal Italian cooking, a short menu that changes with the market, and a warm room to linger in.',
          primaryCta: { label: 'Reserve a table', href: '#contact' },
          secondaryCta: { label: 'See the menu', href: '#menu' },
          image: { alt: 'Plate of fresh tagliatelle', placeholder: 'Signature dish' },
          badge: { label: 'Open tonight', value: '5pm – 10pm' },
        },
        {
          type: 'services',
          id: 'menu',
          tone: 'muted',
          eyebrow: 'From the menu',
          heading: 'This week’s highlights.',
          intro: 'Sample dishes and prices for illustration.',
          items: [
            { name: 'Tagliatelle al ragù', description: 'Slow-cooked beef and pork ragù, parmigiano.', price: '$24' },
            { name: 'Cacio e pepe', description: 'Tonnarelli, pecorino romano, black pepper.', price: '$19' },
            { name: 'Burrata', description: 'Heirloom tomatoes, basil oil, grilled bread.', price: '$16' },
            { name: 'Tiramisù', description: 'Made in house every day.', price: '$11' },
          ],
        },
        {
          type: 'split',
          id: 'story',
          eyebrow: 'Our story',
          heading: 'Simple food, done with care.',
          body: ['This is sample text. A real restaurant website would share the story of the kitchen, the people behind it and where ingredients come from.'],
          image: { alt: 'Chef rolling pasta dough', placeholder: 'In the kitchen' },
        },
        {
          type: 'hours',
          id: 'hours',
          tone: 'inverse',
          heading: 'Hours & location',
          hours: [
            { day: 'Wednesday – Thursday', hours: '5:00pm – 10:00pm' },
            { day: 'Friday – Saturday', hours: '5:00pm – 11:00pm' },
            { day: 'Sunday', hours: '12:00pm – 9:00pm' },
            { day: 'Monday – Tuesday', hours: 'Closed' },
          ],
          address: '8 Placeholder Lane, Anytown',
          phone: '(555) 010-0133',
        },
        {
          type: 'contact',
          id: 'contact',
          eyebrow: 'Reservations',
          heading: 'Reserve a table.',
          intro: 'Send us your preferred date, time and party size and we’ll confirm by email.',
          formName: 'reservation-request',
          submitLabel: 'Request reservation',
          fields: simpleContactFields,
        },
      ],
    },
  ],
};
