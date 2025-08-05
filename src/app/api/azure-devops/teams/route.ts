import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { MockAzureDevOpsService } from '@/services/azure-devops'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // For now, use mock service. In production, this would use real Azure DevOps config
    const azureDevOpsService = new MockAzureDevOpsService()
    
    const teams = await azureDevOpsService.getAllTeamsData()
    
    return NextResponse.json({ teams })
  } catch (error) {
    console.error('Error fetching teams:', error)
    return NextResponse.json(
      { error: 'Failed to fetch teams from Azure DevOps' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { teamId } = body

    if (!teamId) {
      return NextResponse.json({ error: 'Team ID is required' }, { status: 400 })
    }

    const azureDevOpsService = new MockAzureDevOpsService()
    const teamData = await azureDevOpsService.getTeamData(teamId)
    
    return NextResponse.json({ team: teamData })
  } catch (error) {
    console.error('Error fetching team data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team data from Azure DevOps' },
      { status: 500 }
    )
  }
} 