"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Users, 
  GitBranch, 
  Calendar,
  Target,
  Activity,
  User,
  Clock,
  TrendingUp,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Plus,
  Settings
} from 'lucide-react'

interface Member {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: 'developer' | 'lead' | 'qa' | 'designer' | 'product'
  isActive: boolean
}

interface Sprint {
  id: string
  name: string
  startDate: string
  endDate: string
  status: 'active' | 'future' | 'completed'
  velocity: number
  plannedPoints: number
  completedPoints: number
}

interface Team {
  id: string
  name: string
  description?: string
  members: Member[]
  sprint: Sprint
  metrics: {
    velocity: number
    activeStories: number
    averageCycleTime: number
    sprintProgress: number
  }
  source: 'azure-devops' | 'jira'
}



const getRoleColor = (role: string) => {
  switch (role) {
    case 'lead':
      return 'bg-blue-100 text-blue-800'
    case 'developer':
      return 'bg-green-100 text-green-800'
    case 'qa':
      return 'bg-purple-100 text-purple-800'
    case 'designer':
      return 'bg-orange-100 text-orange-800'
    case 'product':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'lead':
      return <Target className="h-4 w-4" />
    case 'developer':
      return <GitBranch className="h-4 w-4" />
    case 'qa':
      return <AlertTriangle className="h-4 w-4" />
    case 'designer':
      return <Activity className="h-4 w-4" />
    case 'product':
      return <User className="h-4 w-4" />
    default:
      return <User className="h-4 w-4" />
  }
}

export default function TeamManagementPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch teams from Azure DevOps API
  const fetchTeams = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/azure-devops/teams')
      
      if (!response.ok) {
        throw new Error('Failed to fetch teams')
      }
      
      const data = await response.json()
      const fetchedTeams = data.teams.map((team: any) => ({
        id: team.id,
        name: team.name,
        description: team.description,
        source: 'azure-devops' as const,
        members: team.members.map((member: any) => ({
          id: member.id,
          name: member.displayName,
          email: member.uniqueName,
          avatarUrl: member.imageUrl,
          role: 'developer' as const, // Default role, would be mapped from Azure DevOps
          isActive: true
        })),
        sprint: team.sprint ? {
          id: team.sprint.id,
          name: team.sprint.name,
          startDate: team.sprint.startDate,
          endDate: team.sprint.endDate,
          status: team.sprint.status as 'active' | 'future' | 'completed',
          velocity: team.metrics.velocity,
          plannedPoints: 40, // Mock data
          completedPoints: Math.round(team.metrics.velocity * 0.4) // Mock calculation
        } : null,
        metrics: {
          velocity: team.metrics.velocity,
          activeStories: team.metrics.activeStories,
          averageCycleTime: team.metrics.averageCycleTime,
          sprintProgress: team.metrics.sprintProgress
        }
      }))
      
      setTeams(fetchedTeams)
      
      if (fetchedTeams.length > 0 && !selectedTeam) {
        setSelectedTeam(fetchedTeams[0].id)
      }
    } catch (err) {
      setError('Failed to fetch teams from Azure DevOps')
    } finally {
      setIsLoading(false)
    }
  }

  const refreshTeams = async () => {
    setIsRefreshing(true)
    await fetchTeams()
    setIsRefreshing(false)
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  const currentTeam = teams.find(team => team.id === selectedTeam)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading teams from Azure DevOps...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (teams.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Teams Found</h3>
        <p className="text-muted-foreground mb-4">
          You don't have access to any teams in Azure DevOps.
        </p>
        <Button onClick={fetchTeams}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            Manage your Azure DevOps teams and track their performance.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={refreshTeams} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Team
          </Button>
        </div>
      </div>

      {/* Team Selection */}
      <div className="flex items-center space-x-4">
        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger className="w-80">
            <SelectValue placeholder="Select a team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                <div className="flex items-center space-x-2">
                  <GitBranch className="h-4 w-4" />
                  <span>{team.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {team.source}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentTeam && (
        <>
          {/* Team Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    {currentTeam.name}
                  </CardTitle>
                  <CardDescription>{currentTeam.description}</CardDescription>
                </div>
                <Badge variant="outline">
                  {currentTeam.source === 'azure-devops' ? 'Azure DevOps' : 'Jira'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentTeam.metrics.velocity}%</div>
                  <p className="text-sm text-muted-foreground">Velocity</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{currentTeam.metrics.activeStories}</div>
                  <p className="text-sm text-muted-foreground">Active Stories</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{currentTeam.metrics.averageCycleTime} days</div>
                  <p className="text-sm text-muted-foreground">Avg Cycle Time</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{currentTeam.metrics.sprintProgress}%</div>
                  <p className="text-sm text-muted-foreground">Sprint Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Team Information */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="members">Team Members</TabsTrigger>
              <TabsTrigger value="sprint">Current Sprint</TabsTrigger>
              <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      {currentTeam.members.length} members • {currentTeam.members.filter(m => m.isActive).length} active
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentTeam.members.slice(0, 3).map((member) => (
                        <div key={member.id} className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={member.avatarUrl} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                          <Badge className={getRoleColor(member.role)}>
                            {member.role}
                          </Badge>
                        </div>
                      ))}
                      {currentTeam.members.length > 3 && (
                        <Button variant="ghost" className="w-full">
                          View all {currentTeam.members.length} members
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Sprint</CardTitle>
                    <CardDescription>{currentTeam.sprint.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm">{currentTeam.sprint.completedPoints}/{currentTeam.sprint.plannedPoints} points</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(currentTeam.sprint.completedPoints / currentTeam.sprint.plannedPoints) * 100}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Start Date</p>
                          <p className="font-medium">{currentTeam.sprint.startDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">End Date</p>
                          <p className="font-medium">{currentTeam.sprint.endDate}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage team members and their roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentTeam.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={member.avatarUrl} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getRoleColor(member.role)}>
                            {getRoleIcon(member.role)}
                            <span className="ml-1">{member.role}</span>
                          </Badge>
                          <Badge variant={member.isActive ? "default" : "secondary"}>
                            {member.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sprint" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Sprint Details</CardTitle>
                  <CardDescription>{currentTeam.sprint.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{currentTeam.sprint.velocity}%</div>
                        <p className="text-sm text-muted-foreground">Velocity</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{currentTeam.sprint.plannedPoints}</div>
                        <p className="text-sm text-muted-foreground">Planned Points</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{currentTeam.sprint.completedPoints}</div>
                        <p className="text-sm text-muted-foreground">Completed Points</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Sprint Progress</h4>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                            style={{ width: `${(currentTeam.sprint.completedPoints / currentTeam.sprint.plannedPoints) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {Math.round((currentTeam.sprint.completedPoints / currentTeam.sprint.plannedPoints) * 100)}% complete
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Team Metrics</CardTitle>
                  <CardDescription>
                    Comprehensive metrics and performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Performance Metrics</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Velocity</span>
                            <span className="font-medium">{currentTeam.metrics.velocity}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Active Stories</span>
                            <span className="font-medium">{currentTeam.metrics.activeStories}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Average Cycle Time</span>
                            <span className="font-medium">{currentTeam.metrics.averageCycleTime} days</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Team Composition</h4>
                        <div className="space-y-3">
                          {Object.entries(
                            currentTeam.members.reduce((acc, member) => {
                              acc[member.role] = (acc[member.role] || 0) + 1
                              return acc
                            }, {} as Record<string, number>)
                          ).map(([role, count]) => (
                            <div key={role} className="flex justify-between items-center">
                              <span className="text-sm capitalize">{role}s</span>
                              <span className="font-medium">{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
} 