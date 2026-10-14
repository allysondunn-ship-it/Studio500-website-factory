/**
 * Content for the Studio500 marketing website. Everything visible on the site
 * lives here as data, using the same blocks a client website would use.
 */
import type { SiteInput } from '@/schema/site';
import { themes } from '@/themes/presets';
import { pricing, usd } from '@/config/pricing';
import { studio } from '@/config/studio';

const { setupFee, hourlyRate, plans } = pricing;
const setup = usd(setupFee);
const hourly = `${usd(hourlyRate)}/hour`;

export const studioSite: SiteInput = {
  business: {
    name: studio.name,
    tagline: 'Modern websites without traditional agency prices.',
    industry: 'studio',
    email: studio.email,
  },
  theme: themes.studio,
  seo: {
    titleTemplate: `%s · ${studio.name}`,
    defaultDescription: `Modern, professional websites for small businesses from ${setup}. See a free preview of your new website before you pay.`,
  },
  navigation: {
    links: [
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Why us', href: '/#benefits' },
      { label: 'Samples', href: '/#work' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'FAQ', href: '/#faq' },
    ],
    cta: { label: 'Get a free preview', href: '/#contact' },
  },
  footer: {
    blurb: 'A small design studio making modern, professional websites for small businesses — without the agency price tag.',
    columns: [
      {
        heading: 'Studio',
        links: [
          { label: 'How it works', href: '/#how-it-works' },
          { label: 'Sample concepts', href: '/#work' },
          { label: 'Pricing', href: '/#pricing' },
        ],
      },
      {
        heading: 'Help',
        links: [
          { label: 'FAQ', href: '/#faq' },
          { label: 'Request a preview', href: '/#contact' },
          { label: 'Redesign my website', href: '/#contact' },
        ],
      },
      {
        heading: 'Legal',
        links: [{ label: 'Privacy notice', href: '/privacy' }],
      },
    ],
    legal: 'All prices in USD.',
  },
  pages: [
    {
      slug: '',
      title: `${studio.name} — A Better Website. Without the Agency Price Tag.`,
      description: `Modern, professional small-business websites from ${setup}. Preview your new website first, purchase when you love it, and launch with simple hosting options.`,
      sections: [
        {
          type: 'hero',
          variant: 'editorial',
          eyebrow: 'Website design for small businesses',
          heading: 'A Better Website. Without the Agency Price Tag.',
          headingAccent: 'Without the Agency Price Tag.',
          intro: `Modern, professional websites designed around your business and priced from ${setup}. See a preview of your new website before you spend a dollar.`,
          primaryCta: { label: 'Get your free preview', href: '#contact' },
          secondaryCta: { label: 'See pricing', href: '#pricing' },
          highlights: [`${setup} one-time setup`, 'Preview before you pay', 'You own your website'],
          badge: {
            label: 'Websites from',
            value: setup,
            note: `One-time setup. Optional hosting plans from ${usd(plans.managed.monthly)}/month.`,
          },
        },
        {
          type: 'steps',
          id: 'how-it-works',
          eyebrow: 'How it works',
          heading: 'Preview. Purchase. Launch.',
          intro: 'A simple, low-risk process. You see your new website before you commit — no lengthy discovery calls, no surprise invoices.',
          steps: [
            {
              icon: 'eye',
              title: 'Preview',
              body: 'Send us your current website or a few details about your business. We design a personalised preview of your new site, so you can see exactly what you’re getting.',
            },
            {
              icon: 'credit-card',
              title: 'Purchase',
              body: `Love it? Choose the plan that suits you — a ${setup} one-time handoff, or add hosting so you never have to think about the technical side.`,
            },
            {
              icon: 'rocket',
              title: 'Launch',
              body: 'We finish your content, connect your domain and put your new website live. Then you get back to running your business.',
            },
          ],
        },
        {
          type: 'features',
          id: 'benefits',
          tone: 'muted',
          eyebrow: 'Why Studio500',
          heading: 'Everything a small business website should be. Nothing it shouldn’t.',
          columns: 3,
          items: [
            {
              icon: 'layout',
              title: 'Designed around your business',
              body: 'A considered, modern design built for your industry and your customers — not a generic template with your logo dropped in.',
            },
            {
              icon: 'smartphone',
              title: 'Beautiful on every screen',
              body: 'Most of your customers will find you on their phone. Every layout is designed mobile-first and tested on small screens.',
            },
            {
              icon: 'gauge',
              title: 'Fast by default',
              body: 'Lightweight pages that load quickly, even on slow connections — better for visitors and better for search rankings.',
            },
            {
              icon: 'search',
              title: 'Ready to be found',
              body: 'Search-engine essentials built in: page titles and descriptions, a sitemap, clean structure and business details search engines understand.',
            },
            {
              icon: 'pencil',
              title: 'Easy to keep current',
              body: 'On a hosting plan, you can update text, photos, services and hours yourself — no code, no developer, no waiting.',
            },
            {
              icon: 'key',
              title: 'Yours to keep',
              body: 'No lock-in. Choose a full handoff from day one, or let us host it — and take your website with you whenever you like.',
            },
          ],
        },
        {
          type: 'portfolio',
          id: 'work',
          eyebrow: 'Sample concepts',
          heading: 'Designed for the way your industry works.',
          intro: 'We’re a new studio, so instead of a long client list, here are sample concepts showing how we approach different kinds of businesses.',
          items: [
            {
              title: 'Harbor Plumbing & Heating',
              industry: 'Home services',
              description: 'Clear services, trust signals and a phone number that’s always one tap away.',
              href: '/samples/harbor-plumbing',
              status: 'sample',
              palette: ['#f6f8fa', '#0f1d2b', '#f4b400'],
            },
            {
              title: 'Juniper Skin Studio',
              industry: 'Beauty & wellness',
              description: 'A calm, elegant menu of treatments with prices and opening hours front and centre.',
              href: '/samples/juniper-skin-studio',
              status: 'sample',
              palette: ['#fbf6f3', '#2b1f1d', '#9c4a5b'],
            },
            {
              title: 'Osteria Verde',
              industry: 'Restaurants',
              description: 'Menu highlights, hours, location and reservations — everything a hungry guest looks for.',
              href: '/samples/osteria-verde',
              status: 'sample',
              palette: ['#f5efe2', '#26301c', '#8f2d1f'],
            },
            {
              title: 'Northline Bookkeeping',
              industry: 'Professional services',
              description: 'Credible, uncluttered and focused on turning visitors into consultations.',
              href: '/samples/northline-bookkeeping',
              status: 'sample',
              palette: ['#f7f7f5', '#14181f', '#1f4fd1'],
            },
          ],
          disclaimer:
            'These are sample concepts for fictional businesses, created to demonstrate our design approach. They are not client projects, and any names, prices and details shown are invented.',
        },
        {
          type: 'pricing',
          id: 'pricing',
          eyebrow: 'Pricing & ownership',
          heading: 'One setup fee. Choose how hands\u2011on you want to be.',
          intro: `Every website starts with the same ${setup} setup. After that, decide whether you’d like to run it yourself or have us look after it.`,
          currency: pricing.currency,
          plans: [
            {
              id: 'handoff',
              label: 'Option A',
              name: plans.handoff.name,
              summary: 'Your finished website, handed over completely. You choose and manage your own hosting.',
              setup: { amount: setupFee, label: 'one-time' },
              included: [
                'Custom-designed, mobile-friendly website',
                'Search-engine essentials set up',
                'Complete website files handed over to you',
                'Guidance on choosing your own hosting',
              ],
              notIncluded: ['Hosting and maintenance', 'Content editing tools and updates'],
              bestFor: `owners who have someone technical on hand. Future help is billed at ${hourly}.`,
              cta: { label: 'Start with a preview', href: '#contact' },
            },
            {
              id: 'managed',
              label: 'Option B',
              name: plans.managed.name,
              summary: 'We host and look after your website. You get a simple editor to update your own content.',
              setup: { amount: setupFee, label: 'one-time setup' },
              recurring: { amount: plans.managed.monthly, interval: 'month', label: 'recurring, for hosting' },
              featured: true,
              included: [
                'Everything in Full Handoff',
                'Fast, secure hosting with SSL (https)',
                'Hosting infrastructure managed for you',
                'Your own login to edit text, photos, services and hours',
              ],
              notIncluded: ['Content updates made for you'],
              bestFor: 'owners who want to make their own updates without the technical side.',
              cta: { label: 'Start with a preview', href: '#contact' },
            },
            {
              id: 'concierge',
              label: 'Option C',
              name: plans.concierge.name,
              summary: 'Managed hosting, plus we make small content updates for you each month.',
              setup: { amount: setupFee, label: 'one-time setup' },
              recurring: { amount: plans.concierge.monthly, interval: 'month', label: 'recurring, hosting + updates' },
              included: [
                'Everything in Managed Hosting',
                `Up to ${plans.concierge.includedUpdates} small content updates each month`,
                'Just email us the change — we handle it',
              ],
              notIncluded: ['Larger changes, new pages and redesigns (billed separately)'],
              bestFor: 'busy owners who would rather hand off the details.',
              cta: { label: 'Start with a preview', href: '#contact' },
            },
          ],
          footnotes: [
            `All prices in US dollars. The ${setup} setup fee is charged once; monthly fees are recurring and listed separately.`,
            `Work outside your plan is billed at ${hourly}. Domain name registration is not included — we’ll help connect the domain you already own.`,
          ],
        },
        {
          type: 'faq',
          id: 'faq',
          tone: 'muted',
          eyebrow: 'Questions',
          heading: 'Frequently asked questions.',
          intro: 'Can’t find what you’re looking for? Ask us anything using the form below.',
          items: [
            {
              question: `What do I get for ${setup}?`,
              answer:
                'A professionally designed, mobile-friendly website built around your business — your services, contact details, opening hours and photos — with search-engine essentials set up. We agree on the exact pages and content with you before you purchase, so there are no surprises.',
            },
            {
              question: 'How does the free preview work?',
              answer:
                'Send us your current website address, or a few details if you don’t have one. We’ll design a preview of your new website and send you a private link. If you like it, you choose a plan and we finish it. If not, you owe nothing.',
            },
            {
              question: 'Do I own my website?',
              answer:
                'Yes. With Full Handoff, you receive the complete website files from day one. On a hosting plan, we run the technical side for you — and if you later want to move on, we’ll hand over your website files.',
            },
            {
              question: 'What’s the difference between the three plans?',
              answer: `All three start with the same ${setup} website. Full Handoff has no monthly fee — you arrange your own hosting. Managed Hosting (${usd(plans.managed.monthly)}/month) means we host it and you edit your own content. Website Concierge (${usd(plans.concierge.monthly)}/month) adds up to ${plans.concierge.includedUpdates} small updates per month made by us.`,
            },
            {
              question: 'Can I update the website myself?',
              answer:
                'On Managed Hosting and Website Concierge, you get a simple visual editor: click on text or a photo, change it and publish. You can manage services, prices and opening hours, and add new sections from ready-made designs. No coding needed.',
            },
            {
              question: 'What counts as a “small content update”?',
              answer:
                'Things like changing opening hours, updating prices, swapping a photo or editing a paragraph. New pages, new features or a redesign are quoted separately.',
            },
            {
              question: 'I already have a website. Can you redesign it?',
              answer:
                'Absolutely — that’s often the quickest route. Send us the link and we’ll use your existing content as the starting point for a modern redesign.',
            },
            {
              question: 'Do I need my own domain name?',
              answer:
                'If you already have one (like yourbusiness.com), we’ll connect your new website to it. If you don’t, we’ll guide you through registering one in your name, so it always belongs to you.',
            },
            {
              question: 'How long does it take?',
              answer:
                'It depends mostly on how quickly we receive your content and approval. We’ll give you a clear timeline with your preview, before you pay anything.',
            },
          ],
        },
        {
          type: 'cta',
          tone: 'accent',
          eyebrow: 'No cost to look',
          heading: 'See your new website before you spend a dollar.',
          body: 'Tell us about your business and we’ll design a free, no-obligation preview.',
          primaryCta: { label: 'Get your free preview', href: '#contact' },
          secondaryCta: { label: 'Compare plans', href: '#pricing' },
        },
        {
          type: 'contact',
          id: 'contact',
          eyebrow: 'Get started',
          heading: 'Request your free website preview.',
          intro:
            'Tell us a little about your business. If you already have a website, include the link — we’ll use it as the starting point for your redesign.',
          formName: 'preview-request',
          submitLabel: 'Request my preview',
          successTitle: 'Request received — thank you.',
          successMessage: 'We’ll review your business and reply by email with your next steps.',
          privacyNote: 'We only use your details to respond to your request. We never sell your information.',
          details: [
            { icon: 'mail', label: 'Email', value: studio.email, href: `mailto:${studio.email}` },
            { icon: 'eye', label: 'Free preview', value: 'No payment needed to see it' },
          ],
          fields: [
            { name: 'name', label: 'Your name', type: 'text', required: true, autocomplete: 'name', width: 'half' },
            { name: 'email', label: 'Email address', type: 'email', required: true, autocomplete: 'email', width: 'half' },
            { name: 'business', label: 'Business name', type: 'text', required: true, autocomplete: 'organization', width: 'half' },
            { name: 'phone', label: 'Phone (optional)', type: 'tel', autocomplete: 'tel', width: 'half' },
            {
              name: 'website',
              label: 'Current website (optional)',
              type: 'url',
              placeholder: 'yourbusiness.com',
              hint: 'Leave blank if you don’t have one yet.',
              autocomplete: 'url',
            },
            {
              name: 'plan',
              label: 'Which option interests you?',
              type: 'select',
              options: ['Not sure yet', plans.handoff.name, plans.managed.name, plans.concierge.name],
            },
            {
              name: 'message',
              label: 'Anything else we should know? (optional)',
              type: 'textarea',
              placeholder: 'What you do, who your customers are, what you’d like your website to do…',
            },
          ],
        },
      ],
    },
    {
      slug: 'privacy',
      title: 'Privacy notice',
      description: `How ${studio.name} handles the information you send us.`,
      sections: [
        {
          type: 'text',
          eyebrow: 'Draft — to be reviewed before launch',
          heading: 'Privacy notice',
          intro: `This page explains, in plain language, what ${studio.name} does with the information you share with us.`,
          parts: [
            {
              heading: 'What we collect',
              paragraphs: [
                'When you request a preview or contact us, we collect the details you enter in the form: your name, email address, business name and, if you provide them, your phone number, website address and message.',
              ],
            },
            {
              heading: 'How we use it',
              paragraphs: [
                'We use your details only to respond to your request, prepare your website preview and, if you become a customer, deliver our services. We do not sell your information.',
                'If you share your current website, we may review its publicly available content to prepare your preview.',
              ],
            },
            {
              heading: 'Services we use',
              paragraphs: [
                'Form submissions are delivered to us through a third-party form service, and this website is hosted by a third-party hosting provider. These providers process data on our behalf.',
              ],
            },
            {
              heading: 'Your choices',
              paragraphs: [`To ask what information we hold about you, or to have it deleted, email ${studio.email}.`],
            },
          ],
        },
      ],
    },
  ],
};
