import type { SiteInput } from '@/schema/site';
import { themes } from '@/themes/presets';
import { sampleBanner, sampleFooterLegal, simpleContactFields } from './_shared';

const name = 'Northline Bookkeeping';

export const northlineBookkeeping: SiteInput = {
  business: { name, industry: 'professional-services', email: 'hello@northline.example', phone: '(555) 010-0119' },
  theme: themes.ledger,
  banner: sampleBanner(name),
  seo: { titleTemplate: `%s · ${name}`, defaultDescription: 'Sample professional services website concept.' },
  navigation: {
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#process' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: { label: 'Book a consultation', href: '#contact' },
  },
  footer: { blurb: 'Monthly bookkeeping and payroll for small businesses.', columns: [], legal: sampleFooterLegal },
  pages: [
    {
      slug: '',
      title: `${name} — Sample concept`,
      description: 'A Studio500 sample concept for a professional services business.',
      noindex: true,
      sections: [
        {
          type: 'hero',
          variant: 'split',
          eyebrow: 'Bookkeeping for small businesses',
          heading: 'Clean books. Clear numbers. Calmer tax season.',
          headingAccent: 'Clear numbers.',
          intro: 'Monthly bookkeeping, payroll and reporting for owners who would rather focus on their business.',
          primaryCta: { label: 'Book a free consultation', href: '#contact' },
          secondaryCta: { label: 'Our services', href: '#services' },
          highlights: ['Fixed monthly fees', 'Cloud accounting', 'Year-end ready'],
          image: { alt: 'Advisor reviewing reports with a client', placeholder: 'Client meeting' },
        },
        {
          type: 'features',
          id: 'services',
          eyebrow: 'Services',
          heading: 'Everything your books need, every month.',
          columns: 3,
          items: [
            { icon: 'briefcase', title: 'Monthly bookkeeping', body: 'Transactions categorised and accounts reconciled, every month.' },
            { icon: 'credit-card', title: 'Payroll', body: 'Accurate, on-time payroll with filings handled for you.' },
            { icon: 'gauge', title: 'Reporting', body: 'Plain-English monthly reports so you always know where you stand.' },
          ],
        },
        {
          type: 'steps',
          id: 'process',
          tone: 'muted',
          eyebrow: 'Process',
          heading: 'Getting started is simple.',
          steps: [
            { title: 'Consultation', body: 'A short call to understand your business and current setup.' },
            { title: 'Clean-up', body: 'We bring your books up to date and set up a monthly routine.' },
            { title: 'Monthly service', body: 'Reconciled books and a clear report, every month.' },
          ],
        },
        {
          type: 'faq',
          id: 'faq',
          heading: 'Common questions.',
          items: [
            { question: 'Which software do you work with?', answer: 'Sample answer: most popular cloud accounting tools.' },
            { question: 'Can you catch up on past months?', answer: 'Sample answer: yes, clean-up work is quoted separately.' },
          ],
        },
        {
          type: 'contact',
          id: 'contact',
          tone: 'muted',
          eyebrow: 'Consultation',
          heading: 'Book a free consultation.',
          formName: 'consultation-request',
          submitLabel: 'Send request',
          fields: simpleContactFields,
          details: [{ icon: 'mail', label: 'Email', value: 'hello@northline.example', href: 'mailto:hello@northline.example' }],
        },
      ],
    },
  ],
};
