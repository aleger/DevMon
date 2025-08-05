export interface AzureDevOpsConfig {
  organization: string
  project: string
  personalAccessToken: string
  baseUrl: string
}

export interface AzureDevOpsTeam {
  id: string
  name: string
  description?: string
  url: string
}

export interface AzureDevOpsMember {
  id: string
  displayName: string
  uniqueName: string
  imageUrl?: string
  descriptor: string
}

export interface AzureDevOpsSprint {
  id: string
  name: string
  startDate: string
  endDate: string
  status: string
  timeFrame: string
  iterationPath?: string
}

export interface AzureDevOpsWorkItem {
  id: number
  title: string
  state: string
  assignedTo?: string
  storyPoints?: number
  iterationPath: string
}

export class AzureDevOpsService {
  private config: AzureDevOpsConfig

  constructor(config: AzureDevOpsConfig) {
    this.config = config
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.config.baseUrl}/${this.config.organization}/${this.config.project}/_apis${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Basic ${btoa(`:${this.config.personalAccessToken}`)}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Azure DevOps API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Fetch all teams the authenticated user has access to
   */
  async getTeams(): Promise<AzureDevOpsTeam[]> {
    try {
      const response = await this.makeRequest('/teams?api-version=7.0')
      return response.value || []
    } catch (error) {
      console.error('Failed to fetch teams:', error)
      throw new Error('Failed to fetch teams from Azure DevOps')
    }
  }

  /**
   * Fetch team members for a specific team
   */
  async getTeamMembers(teamId: string): Promise<AzureDevOpsMember[]> {
    try {
      const response = await this.makeRequest(`/teams/${teamId}/members?api-version=7.0`)
      return response.value || []
    } catch (error) {
      console.error('Failed to fetch team members:', error)
      throw new Error('Failed to fetch team members from Azure DevOps')
    }
  }

  /**
   * Fetch current sprint for a team
   */
  async getCurrentSprint(teamId: string): Promise<AzureDevOpsSprint | null> {
    try {
      const response = await this.makeRequest(`/work/teamsettings/iterations?api-version=7.0&teamId=${teamId}`)
      const iterations = response.value || []
      
      // Find the current sprint (active iteration)
      const currentSprint = iterations.find((iteration: AzureDevOpsSprint) => 
        iteration.status === 'active' || iteration.timeFrame === 'current'
      )
      
      return currentSprint || null
    } catch (error) {
      console.error('Failed to fetch current sprint:', error)
      throw new Error('Failed to fetch current sprint from Azure DevOps')
    }
  }

  /**
   * Fetch work items for a team's current sprint
   */
  async getSprintWorkItems(teamId: string, iterationPath: string): Promise<AzureDevOpsWorkItem[]> {
    try {
      const wiql = `SELECT [System.Id], [System.Title], [System.State], [System.AssignedTo], [Microsoft.VSTS.Scheduling.StoryPoints], [System.IterationPath] 
                    FROM WorkItems 
                    WHERE [System.TeamProject] = '${this.config.project}' 
                    AND [System.IterationPath] = '${iterationPath}' 
                    AND [System.WorkItemType] IN ('User Story', 'Bug', 'Task')`
      
      const response = await this.makeRequest('/wit/wiql?api-version=7.0', {
        method: 'POST',
        body: JSON.stringify({ query: wiql }),
      })

      if (response.workItems && response.workItems.length > 0) {
        const workItemIds = response.workItems.map((wi: any) => wi.id)
        const workItemsResponse = await this.makeRequest(`/wit/workitems?ids=${workItemIds.join(',')}&api-version=7.0`)
        return workItemsResponse.value || []
      }

      return []
    } catch (error) {
      console.error('Failed to fetch sprint work items:', error)
      throw new Error('Failed to fetch sprint work items from Azure DevOps')
    }
  }

  /**
   * Calculate team velocity based on completed work items
   */
  async calculateTeamVelocity(teamId: string, iterationPath: string): Promise<number> {
    try {
      const workItems = await this.getSprintWorkItems(teamId, iterationPath)
      const completedItems = workItems.filter(wi => 
        wi.state === 'Done' || wi.state === 'Closed' || wi.state === 'Resolved'
      )
      
      const totalStoryPoints = completedItems.reduce((sum, item) => 
        sum + (item.storyPoints || 0), 0
      )
      
      return totalStoryPoints
    } catch (error) {
      console.error('Failed to calculate team velocity:', error)
      return 0
    }
  }

  /**
   * Get comprehensive team data including members, sprint, and metrics
   */
  async getTeamData(teamId: string) {
    try {
      const [members, sprint] = await Promise.all([
        this.getTeamMembers(teamId),
        this.getCurrentSprint(teamId)
      ])

      let velocity = 0
      let activeStories = 0
      let averageCycleTime = 0

      if (sprint && sprint.iterationPath) {
        const workItems = await this.getSprintWorkItems(teamId, sprint.iterationPath)
        velocity = await this.calculateTeamVelocity(teamId, sprint.iterationPath)
        activeStories = workItems.filter(wi => 
          wi.state === 'Active' || wi.state === 'In Progress'
        ).length
        
        // Mock average cycle time calculation
        averageCycleTime = 3.2 // This would be calculated from historical data
      }

      return {
        members,
        sprint,
        metrics: {
          velocity,
          activeStories,
          averageCycleTime,
          sprintProgress: sprint ? 70 : 0 // Mock progress calculation
        }
      }
    } catch (error) {
      console.error('Failed to get team data:', error)
      throw new Error('Failed to get team data from Azure DevOps')
    }
  }

  /**
   * Get all teams with their comprehensive data
   */
  async getAllTeamsData() {
    try {
      const teams = await this.getTeams()
      const teamsData = await Promise.all(
        teams.map(async (team) => {
          try {
            const teamData = await this.getTeamData(team.id)
            return {
              ...team,
              ...teamData
            }
          } catch (error) {
            console.error(`Failed to get data for team ${team.name}:`, error)
            return {
              ...team,
              members: [],
              sprint: null,
              metrics: {
                velocity: 0,
                activeStories: 0,
                averageCycleTime: 0,
                sprintProgress: 0
              }
            }
          }
        })
      )

      return teamsData
    } catch (error) {
      console.error('Failed to get all teams data:', error)
      throw new Error('Failed to get teams data from Azure DevOps')
    }
  }
}

// Factory function to create Azure DevOps service instance
export function createAzureDevOpsService(config: AzureDevOpsConfig): AzureDevOpsService {
  return new AzureDevOpsService(config)
}

// Mock service for development/testing
export class MockAzureDevOpsService extends AzureDevOpsService {
  constructor() {
    super({
      organization: 'mock-org',
      project: 'mock-project',
      personalAccessToken: 'mock-token',
      baseUrl: 'https://dev.azure.com'
    })
  }

  async getTeams(): Promise<AzureDevOpsTeam[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return [
      {
        id: 'ciro-irp-1',
        name: 'ciro - IRP 1',
        description: 'Infrastructure and Reliability Platform Team 1',
        url: 'https://dev.azure.com/mock-org/mock-project/_apis/teams/ciro-irp-1'
      },
      {
        id: 'ciro-irp-2',
        name: 'ciro - IRP 2',
        description: 'Infrastructure and Reliability Platform Team 2',
        url: 'https://dev.azure.com/mock-org/mock-project/_apis/teams/ciro-irp-2'
      }
    ]
  }

  async getTeamMembers(teamId: string): Promise<AzureDevOpsMember[]> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockMembers = {
      'ciro-irp-1': [
        {
          id: '1',
          displayName: 'Sarah Johnson',
          uniqueName: 'sarah.johnson@company.com',
          imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          descriptor: 'aad.1234567890'
        },
        {
          id: '2',
          displayName: 'Mike Chen',
          uniqueName: 'mike.chen@company.com',
          imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
          descriptor: 'aad.1234567891'
        },
        {
          id: '3',
          displayName: 'Emily Rodriguez',
          uniqueName: 'emily.rodriguez@company.com',
          imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
          descriptor: 'aad.1234567892'
        },
        {
          id: '4',
          displayName: 'David Kim',
          uniqueName: 'david.kim@company.com',
          imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
          descriptor: 'aad.1234567893'
        }
      ],
      'ciro-irp-2': [
        {
          id: '5',
          displayName: 'Alex Thompson',
          uniqueName: 'alex.thompson@company.com',
          imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
          descriptor: 'aad.1234567894'
        },
        {
          id: '6',
          displayName: 'Lisa Wang',
          uniqueName: 'lisa.wang@company.com',
          imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
          descriptor: 'aad.1234567895'
        },
        {
          id: '7',
          displayName: 'James Wilson',
          uniqueName: 'james.wilson@company.com',
          imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
          descriptor: 'aad.1234567896'
        },
        {
          id: '8',
          displayName: 'Maria Garcia',
          uniqueName: 'maria.garcia@company.com',
          imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
          descriptor: 'aad.1234567897'
        }
      ]
    }

    return mockMembers[teamId as keyof typeof mockMembers] || []
  }

  async getCurrentSprint(teamId: string): Promise<AzureDevOpsSprint | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const mockSprints = {
      'ciro-irp-1': {
        id: 'sprint-15',
        name: 'Sprint 15',
        startDate: '2024-01-15',
        endDate: '2024-01-29',
        status: 'active',
        timeFrame: 'current'
      },
      'ciro-irp-2': {
        id: 'sprint-12',
        name: 'Sprint 12',
        startDate: '2024-01-01',
        endDate: '2024-01-15',
        status: 'active',
        timeFrame: 'current'
      }
    }

    return mockSprints[teamId as keyof typeof mockSprints] || null
  }
} 