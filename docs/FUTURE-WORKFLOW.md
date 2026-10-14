# Future workflow: from a URL to a live client site

This documents the planned automation. **None of it is built yet**, but the
current architecture was designed so each step slots in without a rewrite.

```
 1. Enter URL ─► 2. Extract info ─► 3. Pick template ─► 4. Generate prototype
                                                              │
 9. Handoff ◄─ 8. Domain ◄─ 7. Editing access ◄─ 6. Production ◄─ 5. Preview URL
```

| Step | What happens | How it maps to this codebase | Tools (likely) |
|---|---|---|---|
| **1. Enter URL** | You paste a business's existing website. | A small command-line script (`scripts/prototype.mjs`) or a private form. | Node script |
| **2. Extract public info** | Pull the business name, services, prices, hours, phone, address, tone and colours from the public pages. | Output is a draft **Site** object that matches `src/schema/site.ts`. The zod schema validates it. | Fetch + HTML parsing; an LLM to structure messy text into the schema |
| **3. Select template** | Choose an industry template and theme. | Industry → section recipe (ARCHITECTURE.md) + theme preset in `src/themes/presets.ts`. | Rules first; LLM suggestion optional |
| **4. Generate prototype** | Fill the template with the extracted content. Leave clear placeholders where info is missing. | Write `content/site.ts` into a new repo created from the client template. | GitHub template repo API |
| **5. Temporary preview URL** | Publish to a private, unlisted address to send to the business. | New Cloudflare Pages project → `<name>.pages.dev`. Pages are `noindex` until purchase. | Cloudflare Pages API |
| **6. Convert to production** | After purchase, finalise content and remove `noindex`. | Same repo and project, so no rebuild from scratch. | — |
| **7. Client editing access** | Plans B and C only. | Create a Storyblok space, import the content (same schema), invite the client. | Storyblok Management API |
| **8. Connect domain** | Point the client's existing domain at the site. | Cloudflare custom domain + DNS instructions for the client. The domain stays in the client's name. | Cloudflare API |
| **9. Transfer ownership** | Full handoff (plan A), or a client leaving later. | Export CMS content back into the repo's content file. Transfer the GitHub repo. Client re-deploys on their own host or Cloudflare account. | GitHub transfer; scripted export |

## Guardrails to build in
- **Only public information.** Respect robots.txt. Never copy photos or text
  the business doesn't own into a live site without permission. Prototypes use
  placeholders for images.
- **No invented facts.** Extracted content is marked for review. Testimonials
  are never generated.
- **Prototypes stay private.** Use `noindex`, unguessable URLs, and delete
  them after a set period if there's no purchase.
- **Cost control.** Prototypes cost nothing to host on Cloudflare's free
  tier. CMS spaces are created only after purchase.

## Suggested build order
1. Split out the client template repository (ARCHITECTURE.md).
2. Write the `new-site` script: industry + business name → repo + preview URL.
3. Add extraction (step 2), with a human review step.
4. Automate CMS space setup and content import (step 7).
5. Automate domain connection and handoff export (steps 8–9).
