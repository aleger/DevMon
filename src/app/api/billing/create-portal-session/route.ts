import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs'
import { stripe } from '@/lib/stripe'

export async function POST() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    // Find Stripe customer by email
    const customers = await stripe.customers.list({
      email: user.emailAddresses[0]?.emailAddress,
      limit: 1,
    })

    if (customers.data.length === 0) {
      return new NextResponse('No Stripe customer found', { status: 404 })
    }

    const customer = customers.data[0]

    // Create billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating portal session:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
} 