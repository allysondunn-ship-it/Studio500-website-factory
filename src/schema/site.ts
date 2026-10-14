/**
 * The content schema shared by the Studio500 marketing site and every future
 * client website. A "site" is plain data: business details, a theme, navigation
 * and a list of pages made of predefined sections ("blocks").
 *
 * The same schema is used whether content comes from a local file
 * (src/content/**) or from a CMS such as Storyblok (src/lib/cms). Validating
 * with zod means a typo or missing field fails the build instead of shipping a
 * broken page.
 */
import { z } from 'zod';

// ---------------------------------------------------------------- primitives

export const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const imageSchema = z.object({
  /** Path in /public, or a remote URL. Omit to render a labelled placeholder. */
  src: z.string().optional(),
  alt: z.string(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  /** Short label shown on generated placeholder art, e.g. "Team photo". */
  placeholder: z.string().optional(),
});

export const iconName = z.enum([
  'arrow-right', 'check', 'clock', 'eye', 'gauge', 'key', 'layout', 'mail', 'map-pin',
  'pencil', 'phone', 'rocket', 'search', 'shield', 'smartphone', 'sparkles', 'star',
  'credit-card', 'scissors', 'utensils', 'wrench', 'briefcase', 'leaf', 'calendar',
]);

/** Background treatment for a section. */
const tone = z.enum(['default', 'muted', 'inverse', 'accent']).default('default');

const base = {
  /** Anchor id used by in-page navigation (e.g. "pricing" → /#pricing). */
  id: z.string().optional(),
  tone,
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  intro: z.string().optional(),
};

// -------------------------------------------------------------------- blocks

export const heroBlock = z.object({
  ...base,
  type: z.literal('hero'),
  variant: z.enum(['editorial', 'split', 'centered']).default('split'),
  heading: z.string(),
  /** Part of the heading rendered in the accent style (must appear in heading). */
  headingAccent: z.string().optional(),
  primaryCta: linkSchema,
  secondaryCta: linkSchema.optional(),
  highlights: z.array(z.string()).default([]),
  image: imageSchema.optional(),
  /** A prominent badge, e.g. { label: 'Websites from', value: '$500' }. */
  badge: z.object({ label: z.string(), value: z.string(), note: z.string().optional() }).optional(),
});

export const stepsBlock = z.object({
  ...base,
  type: z.literal('steps'),
  steps: z.array(z.object({ title: z.string(), body: z.string(), icon: iconName.optional() })).min(1),
});

export const featuresBlock = z.object({
  ...base,
  type: z.literal('features'),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
  items: z.array(z.object({ title: z.string(), body: z.string(), icon: iconName.optional() })).min(1),
});

export const splitBlock = z.object({
  ...base,
  type: z.literal('split'),
  body: z.array(z.string()).default([]),
  bullets: z.array(z.string()).default([]),
  image: imageSchema,
  imageSide: z.enum(['left', 'right']).default('right'),
  cta: linkSchema.optional(),
});

export const servicesBlock = z.object({
  ...base,
  type: z.literal('services'),
  items: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        /** Free text so clients can write "$45", "From $120" or "Call for quote". */
        price: z.string().optional(),
        duration: z.string().optional(),
        icon: iconName.optional(),
      }),
    )
    .min(1),
  note: z.string().optional(),
});

export const galleryBlock = z.object({
  ...base,
  type: z.literal('gallery'),
  items: z.array(z.object({ image: imageSchema, caption: z.string().optional() })).min(1),
});

export const portfolioBlock = z.object({
  ...base,
  type: z.literal('portfolio'),
  items: z
    .array(
      z.object({
        title: z.string(),
        industry: z.string(),
        description: z.string(),
        href: z.string().optional(),
        /** "sample" = a fictional concept; "coming-soon" = placeholder slot. */
        status: z.enum(['sample', 'coming-soon']),
        /** Three colours used to draw the preview thumbnail. */
        palette: z.tuple([z.string(), z.string(), z.string()]),
      }),
    )
    .min(1),
  disclaimer: z.string().optional(),
});

export const testimonialsBlock = z.object({
  ...base,
  type: z.literal('testimonials'),
  items: z
    .array(
      z.object({
        quote: z.string(),
        name: z.string(),
        detail: z.string().optional(),
        /** Mark sample text so it is visibly labelled and never mistaken for a real review. */
        placeholder: z.boolean().default(false),
      }),
    )
    .min(1),
});

export const pricingBlock = z.object({
  ...base,
  type: z.literal('pricing'),
  plans: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        name: z.string(),
        summary: z.string(),
        setup: z.object({ amount: z.number(), label: z.string() }),
        recurring: z.object({ amount: z.number(), interval: z.string(), label: z.string() }).optional(),
        included: z.array(z.string()),
        notIncluded: z.array(z.string()).default([]),
        bestFor: z.string().optional(),
        featured: z.boolean().default(false),
        cta: linkSchema,
      }),
    )
    .min(1),
  currency: z.string().default('USD'),
  footnotes: z.array(z.string()).default([]),
});

export const faqBlock = z.object({
  ...base,
  type: z.literal('faq'),
  items: z.array(z.object({ question: z.string(), answer: z.string() })).min(1),
});

export const ctaBlock = z.object({
  ...base,
  type: z.literal('cta'),
  heading: z.string(),
  body: z.string().optional(),
  primaryCta: linkSchema,
  secondaryCta: linkSchema.optional(),
});

export const hoursBlock = z.object({
  ...base,
  type: z.literal('hours'),
  hours: z.array(z.object({ day: z.string(), hours: z.string() })).min(1),
  note: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  mapLink: z.string().optional(),
});

export const formFieldSchema = z.object({
  name: z.string().regex(/^[a-z][a-z0-9_]*$/, 'Use lowercase letters, numbers and underscores'),
  label: z.string(),
  type: z.enum(['text', 'email', 'tel', 'url', 'textarea', 'select']),
  required: z.boolean().default(false),
  placeholder: z.string().optional(),
  hint: z.string().optional(),
  autocomplete: z.string().optional(),
  options: z.array(z.string()).optional(),
  /** Grid width on larger screens. */
  width: z.enum(['full', 'half']).default('full'),
});

export const contactBlock = z.object({
  ...base,
  type: z.literal('contact'),
  /** Identifies the form in submissions, e.g. "redesign-request". */
  formName: z.string(),
  fields: z.array(formFieldSchema).min(1),
  submitLabel: z.string().default('Send message'),
  successTitle: z.string().default('Thank you — message received.'),
  successMessage: z.string().default("We'll be in touch shortly."),
  privacyNote: z.string().optional(),
  details: z
    .array(z.object({ icon: iconName, label: z.string(), value: z.string(), href: z.string().optional() }))
    .default([]),
});

export const textBlock = z.object({
  ...base,
  type: z.literal('text'),
  /** Long-form content such as a privacy notice: optional subheadings with paragraphs. */
  parts: z.array(z.object({ heading: z.string().optional(), paragraphs: z.array(z.string()) })).min(1),
});

export const blockSchema = z.discriminatedUnion('type', [
  heroBlock,
  stepsBlock,
  featuresBlock,
  splitBlock,
  servicesBlock,
  galleryBlock,
  portfolioBlock,
  testimonialsBlock,
  pricingBlock,
  faqBlock,
  ctaBlock,
  hoursBlock,
  contactBlock,
  textBlock,
]);

// ---------------------------------------------------------------------- site

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Use a 6-digit hex colour like #1a1a1a');

export const fontName = z.enum(['fraunces', 'playfair', 'inter', 'manrope']);

export const themeSchema = z.object({
  colors: z.object({
    background: hex,
    surface: hex,
    muted: hex,
    ink: hex,
    inkSoft: hex,
    border: hex,
    accent: hex,
    accentInk: hex,
    /** Optional darker accent for text and icons when the accent is too light to read (e.g. yellow). */
    accentText: hex.optional(),
    inverse: hex,
    inverseInk: hex,
  }),
  fonts: z.object({ display: fontName, body: fontName }),
  radius: z.enum(['sharp', 'soft', 'round']).default('soft'),
});

export const pageSchema = z.object({
  /** "" for the home page, otherwise e.g. "about" or "services/plumbing". */
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  noindex: z.boolean().default(false),
  sections: z.array(blockSchema).min(1),
});

export const siteSchema = z.object({
  business: z.object({
    name: z.string(),
    tagline: z.string().optional(),
    industry: z.enum(['studio', 'home-services', 'beauty-wellness', 'restaurant', 'professional-services', 'other']),
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
  theme: themeSchema,
  seo: z.object({
    titleTemplate: z.string().default('%s'),
    defaultDescription: z.string(),
    ogImage: z.string().optional(),
  }),
  navigation: z.object({
    links: z.array(linkSchema),
    cta: linkSchema.optional(),
  }),
  footer: z.object({
    blurb: z.string().optional(),
    columns: z.array(z.object({ heading: z.string(), links: z.array(linkSchema) })).default([]),
    legal: z.string().optional(),
  }),
  /** Shown above the navigation, e.g. to label a sample concept. */
  banner: z.object({ text: z.string(), link: linkSchema.optional() }).optional(),
  pages: z.array(pageSchema).min(1),
});

export type Link = z.infer<typeof linkSchema>;
export type ImageRef = z.infer<typeof imageSchema>;
export type IconName = z.infer<typeof iconName>;
export type Block = z.infer<typeof blockSchema>;
export type BlockOf<T extends Block['type']> = Extract<Block, { type: T }>;
export type Theme = z.infer<typeof themeSchema>;
export type Page = z.infer<typeof pageSchema>;
export type Site = z.infer<typeof siteSchema>;
/** What authors write: defaults are optional. */
export type SiteInput = z.input<typeof siteSchema>;
