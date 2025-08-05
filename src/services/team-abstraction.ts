export interface Member {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: 'developer' | 'lead' | 'qa' | 'designer' | 'product'
  isActive: boolean
}

export interface Sprint {
  id: string
  name: string
  startDate: string
  endDate: string
  status: 'active' | 'future' | 'completed'
  velocity: number
  plannedPoints: number
  completedPoints: number
}

export interface Team {
  id: string
  name: string
  description?: string
  members: Member[]
  sprint: Sprint | null
  metrics: {
    velocity: number
    activeStories: number
    averageCycleTime: number
    sprintProgress: number
  }
  source: 'azure-devops' | 'jira'
}

export interface TeamService {
  getTeams(): Promise<Team[]>
  getTeam(teamId: string): Promise<Team | null>
  getTeamMembers(teamId: string): Promise<Member[]>
  getCurrentSprint(teamId: string): Promise<Sprint | null>
  getTeamMetrics(teamId: string): Promise<Team['metrics']>
}

export abstract class BaseTeamService implements TeamService {
  abstract getTeams(): Promise<Team[]>
  abstract getTeam(teamId: string): Promise<Team | null>
  abstract getTeamMembers(teamId: string): Promise<Member[]>
  abstract getCurrentSprint(teamId: string): Promise<Sprint | null>
  abstract getTeamMetrics(teamId: string): Promise<Team['metrics']>

  protected mapRole(role: string): Member['role'] {
    const roleMapping: Record<string, Member['role']> = {
      'developer': 'developer',
      'lead': 'lead',
      'qa': 'qa',
      'designer': 'designer',
      'product': 'product',
      'scrum_master': 'lead',
      'product_owner': 'product',
      'test_engineer': 'qa',
      'frontend_developer': 'developer',
      'backend_developer': 'developer',
      'ui_ux_designer': 'designer'
    }

    return roleMapping[role.toLowerCase()] || 'developer'
  }

  protected calculateSprintProgress(sprint: Sprint): number {
    if (sprint.plannedPoints === 0) return 0
    return Math.round((sprint.completedPoints / sprint.plannedPoints) * 100)
  }

  protected async calculateAverageCycleTime(teamId: string): Promise<number> {
    // This would be calculated from historical data
    // For now, return a mock value
    return 3.2
  }
}

// Factory function to create team service based on source
export function createTeamService(source: 'azure-devops' | 'jira', config: any): TeamService {
  switch (source) {
    case 'azure-devops':
      // Import and use Azure DevOps service
      const { createAzureDevOpsService } = require('./azure-devops')
      return createAzureDevOpsService(config)
    case 'jira':
      // Import and use Jira service (to be implemented)
      // const { createJiraService } = require('./jira')
      // return createJiraService(config)
      throw new Error('Jira service not yet implemented')
    default:
      throw new Error(`Unsupported team source: ${source}`)
  }
}

// Team service manager for handling multiple sources
export class TeamServiceManager {
  private services: Map<string, TeamService> = new Map()

  registerService(source: string, service: TeamService) {
    this.services.set(source, service)
  }

  getService(source: string): TeamService | undefined {
    return this.services.get(source)
  }

  async getAllTeams(): Promise<Team[]> {
    const allTeams: Team[] = []
    
    const promises = Array.from(this.services.entries()).map(async ([source, service]) => {
      try {
        const teams = await service.getTeams()
        return teams
      } catch (error) {
        console.error(`Failed to fetch teams from ${source}:`, error)
        return []
      }
    })
    
    const results = await Promise.all(promises)
    results.forEach(teams => allTeams.push(...teams))
    
    return allTeams
  }

  async getTeamsBySource(source: string): Promise<Team[]> {
    const service = this.getService(source)
    if (!service) {
      throw new Error(`No service registered for source: ${source}`)
    }
    
    return service.getTeams()
  }
}

// Utility functions for team data transformation
export function transformAzureDevOpsTeam(team: any): Team {
  return {
    id: team.id,
    name: team.name,
    description: team.description,
    source: 'azure-devops' as const,
    members: team.members?.map((member: any) => ({
      id: member.id,
      name: member.displayName,
      email: member.uniqueName,
      avatarUrl: member.imageUrl,
      role: 'developer' as const, // Would be mapped from Azure DevOps roles
      isActive: true
    })) || [],
    sprint: team.sprint ? {
      id: team.sprint.id,
      name: team.sprint.name,
      startDate: team.sprint.startDate,
      endDate: team.sprint.endDate,
      status: team.sprint.status as 'active' | 'future' | 'completed',
      velocity: team.metrics?.velocity || 0,
      plannedPoints: 40, // Mock data
      completedPoints: Math.round((team.metrics?.velocity || 0) * 0.4) // Mock calculation
    } : null,
    metrics: {
      velocity: team.metrics?.velocity || 0,
      activeStories: team.metrics?.activeStories || 0,
      averageCycleTime: team.metrics?.averageCycleTime || 0,
      sprintProgress: team.metrics?.sprintProgress || 0
    }
  }
}

export function transformJiraTeam(team: any): Team {
  return {
    id: team.id,
    name: team.name,
    description: team.description,
    source: 'jira' as const,
    members: team.members?.map((member: any) => ({
      id: member.id,
      name: member.displayName,
      email: member.emailAddress,
      avatarUrl: member.avatarUrls?.['48x48'],
      role: 'developer' as const, // Would be mapped from Jira roles
      isActive: true
    })) || [],
    sprint: team.sprint ? {
      id: team.sprint.id,
      name: team.sprint.name,
      startDate: team.sprint.startDate,
      endDate: team.sprint.endDate,
      status: team.sprint.state as 'active' | 'future' | 'completed',
      velocity: team.metrics?.velocity || 0,
      plannedPoints: team.sprint.estimatedPoints || 0,
      completedPoints: team.sprint.completedPoints || 0
    } : null,
    metrics: {
      velocity: team.metrics?.velocity || 0,
      activeStories: team.metrics?.activeStories || 0,
      averageCycleTime: team.metrics?.averageCycleTime || 0,
      sprintProgress: team.metrics?.sprintProgress || 0
    }
  }
} 