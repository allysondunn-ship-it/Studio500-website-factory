import type { SiteInput } from '@/schema/site';
import { studioSite } from '@/content/studio500/site';
import { samples } from '@/content/samples';

/** Content stored as files in this repository (the default). */
export function getLocalSite(id: string): SiteInput {
  if (id === 'studio500') return studioSite;
  const sample = samples[id];
  if (!sample) throw new Error(`No local site content found for "${id}".`);
  return sample;
}

export const localSampleIds = Object.keys(samples);
