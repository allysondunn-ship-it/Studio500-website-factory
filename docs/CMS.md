# Visual editing & CMS evaluation

**Status: not connected.** The site reads content from local files. A
Storyblok connector is scaffolded in `src/lib/cms/storyblok.ts` and turns on
only when `CMS_PROVIDER=storyblok` and a token are set. Nothing has been
purchased or created.

## What clients need to do

Edit text and images, manage services, prices and hours, add predefined
sections, create pages from layouts, and publish, all without GitHub,
Terminal or code.

## Storyblok: how it fits

Storyblok is a headless CMS with a **Visual Editor**: the client sees their
real website, clicks a section, and edits it in a side panel. Its building
blocks ("bloks") map one-to-one to our section types. A `services` blok
contains a list of service items, a `hours` blok contains opening hours, and
so on. Clients add sections from a menu of predefined bloks, and new pages
can start from a layout. This matches the requirements well, without us
building a custom editor.

### Costs (approximate, October 2026; verify at storyblok.com/pricing)

| Plan | Price | Users | Notes |
|---|---|---|---|
| **Starter** | Free | 1 seat included, up to 2 users | Commercial use, including client sites, is allowed per Storyblok's support docs. 100 GB/month traffic. Limited roles and workflows. |
| **Growth** | ~$99/month (≈$91 billed annually) | 5 seats | Per space |
| **Growth Plus** | ~$349/month | 15 seats | Per space |
| Extra seats | ~$15/month each | | |

**Pricing is per space**, and one space is one website. So:

- **Separate projects are required.** Each client site needs its own Storyblok space.
- **Separate accounts:** the client is *invited* to their space. They don't
  need their own paid account. For a full handoff, the space's ownership can
  be transferred to the client's own Storyblok account.
- **Economics:** on the $29/month plan, a paid Growth space ($99) loses money.
  The model only works if each client space runs on the **free Starter plan**.
  With you plus the client, that's 2 users, which is within the Starter
  limits as currently published. Confirm this, and the traffic limits, with
  Storyblok before selling.
- Storyblok has an **agency partner program** (free to join) with development
  spaces and revenue share. It's worth asking them whether partner terms
  improve the per-client economics.

### How visual editing would work with our static sites

```
Client edits in Storyblok ──► Visual Editor shows a live preview
                                  (a "preview" deployment that renders draft content)
Client clicks Publish ───────► Storyblok webhook ──► Cloudflare deploy hook
                                  ──► site rebuilds (≈1–2 min) ──► live
```

Work still needed to switch it on, roughly 1–2 days for the first client and
then repeatable:
1. Add `@storyblok/astro` and mark each section as editable, so click-to-edit
   highlights the right block.
2. Create a **preview deployment** per client (same code, `STORYBLOK_VERSION=draft`,
   server rendering via the Cloudflare adapter) for the Visual Editor to load.
3. Define the bloks in Storyblok to mirror `src/schema/site.ts`. We'd script
   this so every new space is set up identically.
4. Connect Storyblok's publish webhook to a Cloudflare Pages deploy hook.

A broken or incomplete publish fails the build, so the live site stays on its
last good version.

### Setting up the scaffold (when you decide to try it)

1. Create a free Storyblok account and a new space for the website.
2. Create a story named **settings** with the site's business, theme,
   navigation and footer fields, and a story named **home** whose `body`
   holds section bloks named like our types (`hero`, `pricing`, …).
3. In Settings → Access Tokens, copy a **preview** token.
4. Set `CMS_PROVIDER=storyblok`, `STORYBLOK_TOKEN=<token>`,
   `STORYBLOK_VERSION=draft` (and `STORYBLOK_REGION` if not EU) in `.env`, then run `npm run dev`.

## Alternatives considered

| Option | Visual click-to-edit | Cost per client (approx., verify) | Notes |
|---|---|---|---|
| **Storyblok** (recommended to trial) | Yes, mature | Free Starter, or ~$99/month Growth | Best editing experience. Watch per-space costs. |
| **TinaCMS** | Yes (inline editing) | Free tier (small teams); paid ~$29+/month | Content stays in Git, so handoff is easy. Needs Tina Cloud for non-technical editors. |
| **CloudCannon** | Yes, strong for static sites | ~$55/month for visual editing (ToolRadar's figure) | Excellent fit for Astro, but the price per site is high for a $29 plan. |
| **Decap / Sveltia CMS** | No (form-based) | Free | Simplest and cheapest. Not click-to-edit. |

**Recommendation:** trial Storyblok's free Starter plan on one sample site
before promising editing to customers. If the free plan's limits don't fit,
TinaCMS is the fallback, since its content stays in Git and simplifies handoff.
