# Studio500 Website Factory

A reusable system for producing modern, affordable small-business websites —
starting with the Studio500 marketing website itself.

> "Studio500" is a placeholder brand name. Change it in `src/config/studio.ts`.

## What's here

| | |
|---|---|
| **Marketing website** | Home page (hero, how it works, benefits, sample concepts, pricing, FAQ, contact form) and a draft privacy notice. |
| **Sample concepts** | Four fictional businesses at `/samples/…` (home services, beauty & wellness, restaurant, professional services). They're built from the same parts a client site would use, and each one is clearly labelled as fictional. |
| **Reusable foundation** | One content schema, 14 section types and 5 theme presets. A new site is a data file, not new code. |
| **CMS scaffolding** | A Storyblok connector that's ready to configure. It's **not connected**; see [docs/CMS.md](docs/CMS.md). |
| **Quality checks** | Type checking, a production build, an accessibility scan, and form and mobile-menu tests. |

## Quick start

You need [Node.js](https://nodejs.org) 22.12 or newer.

```bash
npm install        # once
npm run dev        # live preview at http://localhost:4321
```

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Builds the production website into `dist/` |
| `npm run preview` | Serves the built website locally |
| `npm run check` | Type-checks all code |
| `npm run qa` | Accessibility, form and mobile-menu checks (run `build` first) |
| `npm run qa:screenshots` | Same, plus desktop and mobile screenshots saved in `qa-report/` |
| `npm test` | Runs check, build and qa in one go |

## Where to change things

| To change… | Edit |
|---|---|
| Prices (setup fee, monthly fees, hourly rate) | `src/config/pricing.ts` |
| Brand name and contact email | `src/config/studio.ts` |
| Any words on the marketing site | `src/content/studio500/site.ts` |
| Colours, fonts, corner style | `src/themes/presets.ts` |
| Where form messages go | the `PUBLIC_FORM_ENDPOINT` setting (see [docs/SETUP.md](docs/SETUP.md)) |

## Documentation

- [docs/SETUP.md](docs/SETUP.md): previewing, connecting the form, and deploying. **Start here.**
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): how the system is organised, and the main risks.
- [docs/CMS.md](docs/CMS.md): the Storyblok evaluation, costs, visual editing, and setup.
- [docs/FUTURE-WORKFLOW.md](docs/FUTURE-WORKFLOW.md): the plan for automated prototypes, from URL to preview to launch to handoff.
- [docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md): everything to confirm before going live.
