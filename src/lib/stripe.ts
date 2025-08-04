import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables')
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-07-30.basil',
  typescript: true,
})

export const plans = {
  free: {
    name: 'Free',
    price: 0,
    features: ['Basic metrics', '1 integration', '7-day history'],
  },
  pro: {
    name: 'Pro',
    price: 29,
    features: ['Advanced metrics', 'Unlimited integrations', '30-day history', 'AI insights'],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
  },
  team: {
    name: 'Team',
    price: 99,
    features: ['Everything in Pro', 'Team analytics', 'Custom dashboards', 'Priority support'],
    stripePriceId: process.env.STRIPE_TEAM_PRICE_ID,
  },
} as const

export type PlanType = keyof typeof plans 