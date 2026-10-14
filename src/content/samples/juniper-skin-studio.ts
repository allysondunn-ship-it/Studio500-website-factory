import type { SiteInput } from '@/schema/site';
import { themes } from '@/themes/presets';
import { sampleBanner, sampleFooterLegal, simpleContactFields } from './_shared';

const name = 'Juniper Skin Studio';

export const juniperSkin: SiteInput = {
  business: { name, industry: 'beauty-wellness', phone: '(555) 010-0178', email: 'hello@juniper.example', address: '24 Sample Avenue, Anytown' },
  theme: themes.blush,
  banner: sampleBanner(name),
  seo: { titleTemplate: `%s · ${name}`, defaultDescription: 'Sample beauty and wellness website concept.' },
  navigation: {
    links: [
      { label: 'Treatments', href: '#treatments' },
      { label: 'Studio', href: '#studio' },
      { label: 'Hours', href: '#hours' },
    ],
    cta: { label: 'Book a visit', href: '#contact' },
  },
  footer: { blurb: 'Thoughtful facials and skin treatments in a calm, private studio.', columns: [], legal: sampleFooterLegal },
  pages: [
    {
      slug: '',
      title: `${name} — Sample concept`,
      description: 'A Studio500 sample concept for a beauty and wellness business.',
      noindex: true,
      sections: [
        {
          type: 'hero',
          variant: 'centered',
          eyebrow: 'Skin studio · Anytown',
          heading: 'Unhurried care for healthy, radiant skin.',
          headingAccent: 'radiant skin.',
          intro: 'Personalised facials and treatments in a quiet, private space — tailored to you, never rushed.',
          primaryCta: { label: 'Book a visit', href: '#contact' },
          secondaryCta: { label: 'View treatments', href: '#treatments' },
          image: { alt: 'Treatment room with soft natural light', placeholder: 'Studio interior' },
        },
        {
          type: 'services',
          id: 'treatments',
          eyebrow: 'Treatment menu',
          heading: 'Treatments',
          intro: 'Sample prices for illustration.',
          items: [
            { icon: 'sparkles', name: 'Signature facial', description: 'Cleanse, exfoliate, mask and massage, tailored to your skin.', price: '$95', duration: '60 min' },
            { icon: 'leaf', name: 'Calming facial', description: 'A gentle treatment for sensitive or reactive skin.', price: '$85', duration: '50 min' },
            { icon: 'star', name: 'Glow peel', description: 'A light peel to brighten and refine texture.', price: '$110', duration: '45 min' },
            { icon: 'calendar', name: 'Skin consultation', description: 'A one-to-one consultation and personal routine plan.', price: '$40', duration: '30 min' },
          ],
          note: 'Prices and treatments can be updated by the business owner at any time.',
        },
        {
          type: 'gallery',
          id: 'studio',
          tone: 'muted',
          eyebrow: 'The studio',
          heading: 'A space to slow down.',
          items: [
            { image: { alt: 'Reception area', placeholder: 'Reception' } },
            { image: { alt: 'Treatment room', placeholder: 'Treatment room' } },
            { image: { alt: 'Skincare products on a shelf', placeholder: 'Products' } },
          ],
        },
        {
          type: 'hours',
          id: 'hours',
          heading: 'Hours & location',
          hours: [
            { day: 'Tuesday – Friday', hours: '10:00am – 7:00pm' },
            { day: 'Saturday', hours: '9:00am – 4:00pm' },
            { day: 'Sunday – Monday', hours: 'Closed' },
          ],
          address: '24 Sample Avenue, Anytown',
          phone: '(555) 010-0178',
        },
        {
          type: 'contact',
          id: 'contact',
          tone: 'muted',
          eyebrow: 'Appointments',
          heading: 'Request an appointment.',
          intro: 'Send us a message with your preferred days and we’ll confirm a time.',
          formName: 'appointment-request',
          submitLabel: 'Send request',
          fields: simpleContactFields,
        },
      ],
    },
  ],
};
