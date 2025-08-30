import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'
import { encryptConfig } from '@/lib/encryption'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { baseUrl, email, apiToken, projectKey } = body

    // Validate required fields
    if (!baseUrl || !email || !apiToken || !projectKey) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Test the connection to Jira
    const testResponse = await fetch(
      `${baseUrl}/rest/api/3/project/${projectKey}`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
          'Accept': 'application/json',
        },
      }
    )

    if (!testResponse.ok) {
      return NextResponse.json(
        { error: 'Invalid Jira credentials' },
        { status: 400 }
      )
    }

    // Get user's organization
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        organizations: {
          include: {
            organization: true,
          },
        },
      },
    })

    if (!user?.organizations?.[0]) {
      return NextResponse.json(
        { error: 'User not associated with any organization' },
        { status: 400 }
      )
    }

    const organization = user.organizations[0].organization

    // Create integration with encrypted config
    const integration = await prisma.integration.create({
      data: {
        organizationId: organization.id,
        userId: user.id,
        type: 'JIRA',
        name: `Jira - ${projectKey}`,
        config: encryptConfig({
          baseUrl,
          email,
          apiToken,
          projectKey,
        }),
        isActive: true,
      },
    })

    return NextResponse.json({ integration })
  } catch (error) {
    console.error('Jira integration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        organizations: {
          include: {
            organization: {
              include: {
                integrations: {
                  where: { type: 'JIRA' },
                },
              },
            },
          },
        },
      },
    })

    if (!user?.organizations?.[0]) {
      return NextResponse.json({ integrations: [] })
    }

    const integrations = user.organizations[0].organization.integrations

    return NextResponse.json({ integrations })
  } catch (error) {
    console.error('Get Jira integrations error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 