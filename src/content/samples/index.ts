import type { SiteInput } from '@/schema/site';
import { harborPlumbing } from './harbor-plumbing';
import { juniperSkin } from './juniper-skin-studio';
import { osteriaVerde } from './osteria-verde';
import { northlineBookkeeping } from './northline-bookkeeping';

/** Sample concepts, keyed by URL slug (/samples/<slug>). */
export const samples: Record<string, SiteInput> = {
  'harbor-plumbing': harborPlumbing,
  'juniper-skin-studio': juniperSkin,
  'osteria-verde': osteriaVerde,
  'northline-bookkeeping': northlineBookkeeping,
};
