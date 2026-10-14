/**
 * Storyblok content source — SCAFFOLDING, NOT YET CONNECTED.
 *
 * Expected space structure (one Storyblok space per website):
 *   - a story with slug "settings" holding business, theme, seo, navigation,
 *     footer and banner fields (component "site_settings")
 *   - one story per page, whose "body" field is a list of blocks. Each
 *     Storyblok component is named after a block type in src/schema/site.ts
 *     (hero, steps, features, services, pricing, faq, hours, contact, …) and
 *     uses the same field names.
 *
 * Content is fetched at build time from Storyblok's Content Delivery API and
 * validated against the same zod schema as local content, so a mis-configured
 * component fails the build instead of breaking the live site.
 *
 * See docs/CMS.md for costs, setup steps and how visual editing will work.
 */
import type { SiteInput } from '@/schema/site';

const REGION_HOSTS: Record<string, string> = {
  eu: 'https://api.storyblok.com',
  us: 'https://api-us.storyblok.com',
  ap: 'https://api-ap.storyblok.com',
  ca: 'https://api-ca.storyblok.com',
  cn: 'https://app.storyblokchina.cn',
};

interface StoryblokStory {
  slug: string;
  full_slug: string;
  name: string;
  content: Record<string, unknown>;
}

function config() {
  const token = import.meta.env.STORYBLOK_TOKEN;
  if (!token) {
    throw new Error('CMS_PROVIDER is "storyblok" but STORYBLOK_TOKEN is not set. See docs/CMS.md.');
  }
  const version = import.meta.env.STORYBLOK_VERSION === 'draft' ? 'draft' : 'published';
  const host = REGION_HOSTS[import.meta.env.STORYBLOK_REGION ?? 'eu'] ?? REGION_HOSTS.eu;
  return { token, version, host };
}

async function fetchStories(): Promise<StoryblokStory[]> {
  const { token, version, host } = config();
  const stories: StoryblokStory[] = [];
  for (let page = 1; ; page++) {
    const url = new URL('/v2/cdn/stories', host);
    url.searchParams.set('token', token);
    url.searchParams.set('version', version);
    url.searchParams.set('per_page', '100');
    url.searchParams.set('page', String(page));
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Storyblok request failed: ${res.status} ${res.statusText}`);
    const json = (await res.json()) as { stories: StoryblokStory[] };
    stories.push(...json.stories);
    if (json.stories.length < 100) break;
  }
  return stories;
}

/**
 * Converts Storyblok's data shapes into our plain schema shapes:
 * - blocks: `component` → `type`; internal keys (`_uid`, `_editable`) removed
 * - assets: `{ filename, alt }` → `{ src, alt }`
 * - links:  `{ cached_url | url }` → string
 * - empty strings → undefined, so optional fields fall back to defaults
 */
export function normalise(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalise);
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if ('filename' in obj && 'fieldtype' in obj && obj.fieldtype === 'asset') {
      return obj.filename ? { src: obj.filename, alt: (obj.alt as string) || '' } : undefined;
    }
    if ('linktype' in obj) {
      const url = (obj.url as string) || (obj.cached_url as string) || '';
      return obj.linktype === 'story' && url && !url.startsWith('/') ? `/${url}` : url;
    }
    const out: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(obj)) {
      if (key === '_uid' || key === '_editable') continue;
      if (key === 'component') {
        out.type = v;
        continue;
      }
      const n = normalise(v);
      if (n !== undefined && n !== '') out[key] = n;
    }
    return out;
  }
  return value;
}

export async function getStoryblokSite(): Promise<SiteInput> {
  const stories = await fetchStories();
  const settings = stories.find((s) => s.slug === 'settings');
  if (!settings) throw new Error('Storyblok space has no "settings" story. See docs/CMS.md.');

  const pages = stories
    .filter((s) => s !== settings)
    .map((s) => {
      const content = normalise(s.content) as Record<string, unknown>;
      return {
        slug: s.full_slug === 'home' ? '' : s.full_slug.replace(/\/$/, ''),
        title: (content.title as string) ?? s.name,
        description: (content.description as string) ?? '',
        noindex: Boolean(content.noindex),
        sections: (content.body as unknown[]) ?? [],
      };
    });

  const { type: _type, ...siteSettings } = normalise(settings.content) as Record<string, unknown>;
  return { ...siteSettings, pages } as SiteInput;
}
