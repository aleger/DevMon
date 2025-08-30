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
    const { organizationUrl, personalAccessToken, projectName } = body

    // Validate required fields
    if (!organizationUrl || !personalAccessToken || !projectName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Test the connection to Azure DevOps
    const testResponse = await fetch(
      `${organizationUrl}/_apis/projects?api-version=6.0`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`:${personalAccessToken}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!testResponse.ok) {
      return NextResponse.json(
        { error: 'Invalid Azure DevOps credentials' },
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
        type: 'AZURE_DEVOPS',
        name: `Azure DevOps - ${projectName}`,
        config: encryptConfig({
          organizationUrl,
          personalAccessToken,
          projectName,
        }),
        isActive: true,
      },
    })

    return NextResponse.json({ integration })
  } catch (error) {
    console.error('Azure DevOps integration error:', error)
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
                  where: { type: 'AZURE_DEVOPS' },
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
    console.error('Get Azure DevOps integrations error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 