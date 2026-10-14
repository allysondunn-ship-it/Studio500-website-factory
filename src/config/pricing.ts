/**
 * Studio500 pricing — edit the numbers here and the whole website updates
 * (hero badge, pricing cards, FAQ answers). Amounts are in US dollars.
 */
export const pricing = {
  currency: 'USD',
  /** One-time setup fee shared by every plan. */
  setupFee: 500,
  /** Hourly rate for support and work outside a plan. */
  hourlyRate: 100,
  plans: {
    handoff: { name: 'Full Handoff', monthly: 0 },
    managed: { name: 'Managed Hosting', monthly: 29 },
    concierge: { name: 'Website Concierge', monthly: 79, includedUpdates: 2 },
  },
} as const;

export const usd = (n: number) => `$${n.toLocaleString('en-US')}`;
