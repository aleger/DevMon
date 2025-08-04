import { NextResponse } from 'next/server'
import { auth, currentUser, clerkClient } from '@clerk/nextjs'

interface IntegrationConfig {
  azureDevOps: {
    enabled: boolean
    organization: string
    pat: string
  }
  jira: {
    enabled: boolean
    domain: string
    email: string
    apiToken: string
  }
}

export async function POST(req: Request) {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const config: IntegrationConfig = await req.json()

    // Validate that only one integration is enabled
    const enabledCount = [config.azureDevOps.enabled, config.jira.enabled].filter(Boolean).length
    if (enabledCount > 1) {
      return new NextResponse('Only one integration can be active at a time', { status: 400 })
    }

    // Simulate connection tests
    if (config.azureDevOps.enabled) {
      // Simulate Azure DevOps connection test
      if (!config.azureDevOps.organization || !config.azureDevOps.pat) {
        return new NextResponse('Azure DevOps configuration is incomplete', { status: 400 })
      }
      // In a real implementation, you would test the connection here
      console.log('Testing Azure DevOps connection...')
    }

    if (config.jira.enabled) {
      // Simulate Jira connection test
      if (!config.jira.domain || !config.jira.email || !config.jira.apiToken) {
        return new NextResponse('Jira configuration is incomplete', { status: 400 })
      }
      // In a real implementation, you would test the connection here
      console.log('Testing Jira connection...')
    }

    // Save configuration to Clerk user metadata
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        integrationConfig: config,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving integration config:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}

export async function GET(req: Request) {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const config = user.publicMetadata.integrationConfig as IntegrationConfig | undefined

    if (!config) {
      // Return default configuration
      return NextResponse.json({
        azureDevOps: {
          enabled: false,
          organization: '',
          pat: '',
        },
        jira: {
          enabled: false,
          domain: '',
          email: '',
          apiToken: '',
        },
      })
    }

    return NextResponse.json(config)
  } catch (error) {
    console.error('Error fetching integration config:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
} 