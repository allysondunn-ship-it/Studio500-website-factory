/**
 * Single entry point for site content. Pages call `getSite()` and don't care
 * whether content comes from local files or a CMS.
 */
import { siteSchema, type Site } from '@/schema/site';
import { getLocalSite } from './local';
import { getStoryblokSite } from './storyblok';

export { localSampleIds } from './local';

const cache = new Map<string, Promise<Site>>();

export function getSite(id: string): Promise<Site> {
  if (!cache.has(id)) cache.set(id, load(id));
  return cache.get(id)!;
}

async function load(id: string): Promise<Site> {
  // Only the main site can come from the CMS; samples always use local files.
  const provider = id === 'studio500' ? (import.meta.env.CMS_PROVIDER ?? 'local') : 'local';
  const raw = provider === 'storyblok' ? await getStoryblokSite() : getLocalSite(id);
  const result = siteSchema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  • ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Content for "${id}" is invalid:\n${issues}`);
  }
  return result.data;
}
