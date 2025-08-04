import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { clerkClient } from '@clerk/nextjs'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return new NextResponse('Webhook signature verification failed', { status: 400 })
  }

  const session = event.data.object as any

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSession = session
      
      // Update Clerk user metadata with Stripe customer ID
      if (checkoutSession.customer && checkoutSession.metadata?.clerkUserId) {
        try {
          await clerkClient.users.updateUserMetadata(
            checkoutSession.metadata.clerkUserId,
            {
              publicMetadata: {
                stripeCustomerId: checkoutSession.customer,
                plan: checkoutSession.metadata.plan,
              },
            }
          )
          console.log('Updated Clerk user metadata with Stripe customer ID')
        } catch (error) {
          console.error('Error updating Clerk user metadata:', error)
        }
      }
      break

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = session
      
      // Update Clerk user metadata with subscription status
      if (subscription.metadata?.clerkUserId) {
        try {
          await clerkClient.users.updateUserMetadata(
            subscription.metadata.clerkUserId,
            {
              publicMetadata: {
                subscriptionStatus: subscription.status,
                subscriptionId: subscription.id,
              },
            }
          )
          console.log('Updated Clerk user metadata with subscription status')
        } catch (error) {
          console.error('Error updating Clerk user metadata:', error)
        }
      }
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return new NextResponse('Webhook processed successfully', { status: 200 })
} 