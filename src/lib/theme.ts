import type { Theme } from '@/schema/site';

const fontStacks: Record<Theme['fonts']['display'], string> = {
  fraunces: "'Fraunces Variable', 'Iowan Old Style', Georgia, serif",
  playfair: "'Playfair Display Variable', Georgia, serif",
  inter: "'Inter Variable', ui-sans-serif, system-ui, sans-serif",
  manrope: "'Manrope Variable', ui-sans-serif, system-ui, sans-serif",
};

const radii: Record<Theme['radius'], [string, string]> = {
  // [small elements like buttons/inputs, large elements like cards]
  sharp: ['2px', '4px'],
  soft: ['10px', '18px'],
  round: ['999px', '28px'],
};

/** Turns a theme into CSS custom properties consumed by src/styles/global.css. */
export function themeToCss(theme: Theme): string {
  const c = theme.colors;
  const [rSm, rLg] = radii[theme.radius];
  const vars: Record<string, string> = {
    '--raw-bg': c.background,
    '--raw-surface': c.surface,
    '--raw-muted': c.muted,
    '--raw-ink': c.ink,
    '--raw-ink-soft': c.inkSoft,
    '--raw-border': c.border,
    '--raw-accent': c.accent,
    '--raw-accent-ink': c.accentInk,
    '--raw-accent-text': c.accentText ?? c.accent,
    '--raw-inverse': c.inverse,
    '--raw-inverse-ink': c.inverseInk,
    '--f-display': fontStacks[theme.fonts.display],
    '--f-body': fontStacks[theme.fonts.body],
    '--r-sm': rSm,
    '--r-lg': rLg,
  };
  return `:root{${Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(';')}}`;
}
