# Architecture

## Principles

1. **Static sites.** Every website is plain HTML, CSS and a few kilobytes of
   JavaScript, built ahead of time. That means no servers to maintain, no
   database, near-zero hosting cost and fast pages.
2. **Content is data.** A website is one data object made of business details,
   a theme, navigation and pages built from predefined sections. A new client
   site is a new data file, not new code.
3. **One schema, many sources.** Content can live in a local file or in a CMS
   (Storyblok). Both are checked against the same schema, so they can be
   swapped. This is what makes a full handoff possible: a client can leave the
   CMS without losing their website.
4. **Independent client sites.** Each client gets their own repository, their
   own hosting project and, if needed, their own CMS space. Nothing is shared
   at runtime, so any site can be transferred on its own.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Astro 7 (static output) + TypeScript | Ships zero JavaScript by default, simple components, excellent performance |
| Styling | Tailwind CSS 4 + CSS custom properties | Fast to build with; themes are just variables |
| Validation | zod | Content errors fail the build instead of breaking a live page |
| Hosting | Cloudflare Pages (static) | Free tier, global CDN, preview URLs per deploy |
| CMS (optional) | Storyblok, scaffolded only | Visual editor; see CMS.md for costs |
| Forms | Any JSON form endpoint (Formspree, Basin…) | No backend to build or secure |

## Folder structure

```
src/
  config/            ← Business settings: pricing.ts, studio.ts
  schema/site.ts     ← THE content schema (site, theme, pages, 14 block types)
  themes/presets.ts  ← Theme presets: studio, harbor, blush, trattoria, ledger
  content/
    studio500/       ← Marketing website content
    samples/         ← Fictional sample concepts (one file per business)
  components/
    blocks/          ← One component per section type (Hero, Pricing, Faq, …)
    layout/          ← Header, Footer, Wordmark
    ui/              ← Button, Icon, Picture (with placeholder art), BrowserMock…
    SectionRenderer.astro ← Maps block "type" → component
  layouts/SiteLayout.astro ← SEO tags, theme variables, fonts, header/footer
  lib/
    cms/             ← Content loading: local files or Storyblok
    theme.ts         ← Theme → CSS variables
  scripts/forms.ts   ← Form validation and submission
  pages/             ← Routes: /, /privacy, /samples/<name>, 404, robots.txt
scripts/qa.mjs       ← Accessibility, form and mobile checks + screenshots
docs/                ← You are here
```

## Content model

```
Site
├─ business   name, industry, email, phone, address
├─ theme      10 colours (+ optional accentText), display/body font, corner style
├─ seo        title template, default description, share image
├─ navigation links + call-to-action button
├─ footer     blurb, link columns, legal line
├─ banner     optional strip above the header (used to label samples)
└─ pages[]    slug, title, description, noindex, sections[]
               └─ section = one of:
                  hero · steps · features · split · services · gallery ·
                  portfolio · testimonials · pricing · faq · cta · hours ·
                  contact · text
```

Every section also accepts `id` (for menu links), `tone` (`default`, `muted`,
`inverse` or `accent` background), `eyebrow`, `heading` and `intro`.

Industry needs map onto these blocks:

| Industry | Typical sections |
|---|---|
| Home services | hero (split, phone CTA), services with prices, split "about", testimonials, hours, contact/quote |
| Beauty & wellness | hero (centered), services as treatment menu with durations, gallery, hours, booking request |
| Restaurants | hero, services as menu highlights, split story, hours & location, reservation request |
| Professional services | hero, features, steps (process), faq, consultation form |

New industry-specific sections (for example a menu with categories, a
booking-widget embed or a service-area map) are added in three steps: add a
schema in `schema/site.ts`, add a component in `components/blocks/`, and
register it in `SectionRenderer.astro`.

## How client sites will be produced

**Today:** this repository holds the marketing site and four sample concepts.

**Next step (recommended):** split this repository into two:
- **`studio500-website-factory`** (this repo): the marketing site, plus the
  master copy of the components and schema.
- **`studio500-client-template`**: a GitHub *template repository* with the
  same components, an empty content file and no marketing pages.

For each client:
1. Create a new repository from the template.
2. Fill in its content file, or connect it to a Storyblok space.
3. Create a Cloudflare Pages project for it, which gives it a preview URL.

**Trade-off:** each client site carries its own copy of the components. That
keeps sites fully independent and transferable, but improvements don't reach
older sites automatically. That's acceptable at small scale. If it becomes
painful, publish the components as a private npm package that client sites
update deliberately.

This deliberately avoids a multi-tenant platform. There's no shared database,
login system or server.

## Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **CMS cost per client.** Storyblok paid plans are ~$99/month per space, which is more than the $29 plan. | Margin | Use the free Starter plan per client, check its limits, or use a cheaper editor (CMS.md). Decide before selling plan B or C. |
| **Visual editing on static sites.** Live click-to-edit preview needs a draft-rendering preview deployment and a rebuild on publish. | Feature isn't ready yet | Build one preview deployment per client (CMS.md, "How visual editing would work"). The site copy flags this in the launch checklist. |
| **Client breaks their own site in the CMS.** Free plans lack fine-grained roles. | Support time | The schema rejects invalid content at build time, so a broken publish fails the build and the live site keeps the last good version. |
| **Hosting build limits.** Cloudflare's free tier caps builds per month across the account. | Many clients publishing often | Monitor usage; Cloudflare's paid plan (~$5/month at time of writing) raises limits. Batch rebuilds if needed. |
| **Handoff complexity.** A client leaving would need repo, hosting, CMS and domain moved. | Support time | Domains stay in the client's name. Repos transfer via GitHub. Content can be exported from the CMS to a local file, since the schema is the same, so the handed-over site needs no CMS. |
| **Component drift across client sites.** | Maintenance | Template repo now; versioned package later. |
| **Placeholder claims.** | Trust and legal | No invented testimonials or client work. Samples are labelled, noindexed and left out of the sitemap. See LAUNCH-CHECKLIST.md. |
| **Third-party prices change.** | Planning | All costs in these docs are approximate as of October 2026. Verify them before committing. |

## Performance and accessibility notes

- Pages ship about 50 KB of CSS and JS in total (uncompressed). Fonts are self-hosted and load only when used.
- Placeholder images are inline SVG, so they cost no network requests. Real
  photos go in `public/images/` and are referenced from content with width and
  height to prevent layout shift. For heavy photography, use Cloudflare Images
  or Astro's `<Image>` component in a later iteration.
- Accessibility features: semantic landmarks, a skip link, visible focus
  states, labelled fields with linked error messages, a live status region,
  keyboard-operable menu and FAQ, and reduced-motion support. `npm run qa`
  runs an axe WCAG 2.1 AA scan on every page.
