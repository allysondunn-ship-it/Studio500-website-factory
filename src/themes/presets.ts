/**
 * Theme presets. A client site picks one and can override any value in its
 * own content file — colours, fonts and corner style are all data.
 */
import type { Theme } from '@/schema/site';

export const themes = {
  /** Studio500 marketing site: warm paper, deep ink, vermilion accent. */
  studio: {
    colors: {
      background: '#f4f1ea',
      surface: '#fbf9f5',
      muted: '#ebe6db',
      ink: '#17150f',
      inkSoft: '#59544a',
      border: '#d9d2c3',
      accent: '#b9401a',
      accentInk: '#ffffff',
      inverse: '#17150f',
      inverseInk: '#f4f1ea',
    },
    fonts: { display: 'fraunces', body: 'inter' },
    radius: 'soft',
  },
  /** Home services: trustworthy navy with a confident safety-yellow accent. */
  harbor: {
    colors: {
      background: '#f6f8fa',
      surface: '#ffffff',
      muted: '#e8eef3',
      ink: '#0f1d2b',
      inkSoft: '#4a5a6a',
      border: '#d3dde6',
      accent: '#f4b400',
      accentInk: '#0f1d2b',
      accentText: '#8a5f00',
      inverse: '#0f2a43',
      inverseInk: '#f6f8fa',
    },
    fonts: { display: 'manrope', body: 'inter' },
    radius: 'soft',
  },
  /** Beauty & wellness: soft blush, refined serif, generous curves. */
  blush: {
    colors: {
      background: '#fbf6f3',
      surface: '#ffffff',
      muted: '#f3e7e1',
      ink: '#2b1f1d',
      inkSoft: '#6d5a55',
      border: '#ead9d1',
      accent: '#9c4a5b',
      accentInk: '#ffffff',
      inverse: '#3a2a2c',
      inverseInk: '#fbf6f3',
    },
    fonts: { display: 'playfair', body: 'manrope' },
    radius: 'round',
  },
  /** Restaurants: deep olive and cream, editorial serif. */
  trattoria: {
    colors: {
      background: '#f5efe2',
      surface: '#fbf7ee',
      muted: '#ebe2cf',
      ink: '#1f2417',
      inkSoft: '#575c4a',
      border: '#d9cfb8',
      accent: '#8f2d1f',
      accentInk: '#fbf7ee',
      inverse: '#26301c',
      inverseInk: '#f5efe2',
    },
    fonts: { display: 'fraunces', body: 'manrope' },
    radius: 'sharp',
  },
  /** Professional services: calm slate and ink blue, clean sans. */
  ledger: {
    colors: {
      background: '#f7f7f5',
      surface: '#ffffff',
      muted: '#ececea',
      ink: '#14181f',
      inkSoft: '#525a66',
      border: '#d9dbe0',
      accent: '#1f4fd1',
      accentInk: '#ffffff',
      inverse: '#111827',
      inverseInk: '#f7f7f5',
    },
    fonts: { display: 'inter', body: 'inter' },
    radius: 'sharp',
  },
} satisfies Record<string, Theme>;

export type ThemeName = keyof typeof themes;
