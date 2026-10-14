# Setup guide

Plain-language steps for anything that needs **your** action. Nothing here
has been purchased, deployed or connected yet.

## 1. Preview the website on your computer

1. Install **Node.js** (the "LTS" version) from https://nodejs.org.
2. Download this repository. On GitHub, use **Code → Download ZIP**, then unzip it.
3. Open a terminal in the folder and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open http://localhost:4321 in your browser. Edits to content files show up instantly.

If you'd rather not use a terminal at all, the simplest option is to deploy
the site to Cloudflare Pages (step 3). Every change you push then gets its own
preview link.

## 2. Connect the contact form (needed before launch)

The form already validates input and shows success and error messages, but it
**doesn't send anywhere yet**. Until it's connected, visitors see
"This form isn't connected yet", along with your email address.

The cheapest route is a hosted form service, so you don't need a server:

| Service | Free tier (verify on their site) | Notes |
|---|---|---|
| [Formspree](https://formspree.io) | ~50 submissions/month | Simple; spam filtering included |
| [Basin](https://usebasin.com) | Limited free plan | Good spam filtering |
| [Web3Forms](https://web3forms.com) | Generous free tier | Needs an access key field (small code change) |

Steps (using Formspree as the example):
1. Create a free Formspree account and a new form. Set it to email you.
2. Copy the form's endpoint. It looks like `https://formspree.io/f/abcd1234`.
3. Add it as an environment variable called `PUBLIC_FORM_ENDPOINT`:
   - **On your computer:** copy `.env.example` to `.env` and paste the value after `PUBLIC_FORM_ENDPOINT=`.
   - **On Cloudflare Pages:** go to Project → Settings → Environment variables.
4. Rebuild or redeploy. Send yourself a test message.

## 3. Deploy to Cloudflare Pages (when you're ready; requires your approval)

Cloudflare Pages has a free plan that suits static sites like this one. Check
current limits at https://pages.cloudflare.com.

1. Create a free Cloudflare account.
2. Go to **Workers & Pages → Create → Pages → Connect to Git**, then choose this GitHub repository.
3. Enter the build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variables: `NODE_VERSION` = `22`, `SITE_URL` = your final web address, and `PUBLIC_FORM_ENDPOINT` from step 2.
4. Deploy. You'll get a free `*.pages.dev` address you can share for previews.
5. Add your own domain under **Custom domains** once you've bought one.

## 4. Settings reference

All settings are optional for local previews. See `.env.example`.

| Setting | Purpose | Needed for launch? |
|---|---|---|
| `SITE_URL` | Your public web address (used for SEO and the sitemap) | **Yes**. It's currently a placeholder (`studio500.example`). |
| `PUBLIC_FORM_ENDPOINT` | Where form submissions are sent | **Yes** |
| `CMS_PROVIDER` | `local` (default) or `storyblok` | No |
| `STORYBLOK_TOKEN`, `STORYBLOK_VERSION`, `STORYBLOK_REGION` | Storyblok connection | Only if you adopt Storyblok |

Never put real tokens in the code or commit a `.env` file. The `.gitignore` already blocks it.
