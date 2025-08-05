"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  GitBranch, 
  Users, 
  Zap,
  Calendar,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react'

interface Team {
  id: string
  name: string
  members: number
  projects: number
}

interface Metric {
  name: string
  value: string
  change: number
  trend: 'up' | 'down' | 'neutral'
  description: string
  icon: React.ReactNode
}

const teams: Team[] = [
  { id: 'all', name: 'All Teams', members: 24, projects: 8 },
  { id: 'frontend', name: 'Frontend Team', members: 6, projects: 3 },
  { id: 'backend', name: 'Backend Team', members: 8, projects: 4 },
  { id: 'mobile', name: 'Mobile Team', members: 5, projects: 2 },
  { id: 'qa', name: 'QA Team', members: 5, projects: 3 },
]

const getMetrics = (teamId: string): Metric[] => {
  const baseMetrics = {
    all: [
      { name: 'Lead Time', value: '4.2 days', change: 12, trend: 'down' as const, description: 'Average time from commit to deployment', icon: <Clock className="h-4 w-4" /> },
      { name: 'Deployment Frequency', value: '2.1/day', change: 8, trend: 'up' as const, description: 'Number of deployments per day', icon: <GitBranch className="h-4 w-4" /> },
      { name: 'PR Cycle Time', value: '1.8 days', change: -5, trend: 'up' as const, description: 'Time from PR creation to merge', icon: <Activity className="h-4 w-4" /> },
      { name: 'MTTR', value: '2.3 hours', change: 15, trend: 'down' as const, description: 'Mean time to recovery', icon: <Target className="h-4 w-4" /> },
    ],
    frontend: [
      { name: 'Lead Time', value: '3.8 days', change: 8, trend: 'down' as const, description: 'Average time from commit to deployment', icon: <Clock className="h-4 w-4" /> },
      { name: 'Deployment Frequency', value: '2.5/day', change: 12, trend: 'up' as const, description: 'Number of deployments per day', icon: <GitBranch className="h-4 w-4" /> },
      { name: 'PR Cycle Time', value: '1.5 days', change: -3, trend: 'up' as const, description: 'Time from PR creation to merge', icon: <Activity className="h-4 w-4" /> },
      { name: 'MTTR', value: '1.8 hours', change: 10, trend: 'down' as const, description: 'Mean time to recovery', icon: <Target className="h-4 w-4" /> },
    ],
    backend: [
      { name: 'Lead Time', value: '4.5 days', change: 15, trend: 'down' as const, description: 'Average time from commit to deployment', icon: <Clock className="h-4 w-4" /> },
      { name: 'Deployment Frequency', value: '1.8/day', change: 5, trend: 'up' as const, description: 'Number of deployments per day', icon: <GitBranch className="h-4 w-4" /> },
      { name: 'PR Cycle Time', value: '2.1 days', change: -8, trend: 'up' as const, description: 'Time from PR creation to merge', icon: <Activity className="h-4 w-4" /> },
      { name: 'MTTR', value: '2.8 hours', change: 20, trend: 'down' as const, description: 'Mean time to recovery', icon: <Target className="h-4 w-4" /> },
    ],
    mobile: [
      { name: 'Lead Time', value: '5.2 days', change: 18, trend: 'down' as const, description: 'Average time from commit to deployment', icon: <Clock className="h-4 w-4" /> },
      { name: 'Deployment Frequency', value: '1.2/day', change: 3, trend: 'up' as const, description: 'Number of deployments per day', icon: <GitBranch className="h-4 w-4" /> },
      { name: 'PR Cycle Time', value: '2.5 days', change: -12, trend: 'up' as const, description: 'Time from PR creation to merge', icon: <Activity className="h-4 w-4" /> },
      { name: 'MTTR', value: '3.1 hours', change: 25, trend: 'down' as const, description: 'Mean time to recovery', icon: <Target className="h-4 w-4" /> },
    ],
    qa: [
      { name: 'Lead Time', value: '3.9 days', change: 6, trend: 'down' as const, description: 'Average time from commit to deployment', icon: <Clock className="h-4 w-4" /> },
      { name: 'Deployment Frequency', value: '2.3/day', change: 9, trend: 'up' as const, description: 'Number of deployments per day', icon: <GitBranch className="h-4 w-4" /> },
      { name: 'PR Cycle Time', value: '1.6 days', change: -4, trend: 'up' as const, description: 'Time from PR creation to merge', icon: <Activity className="h-4 w-4" /> },
      { name: 'MTTR', value: '2.0 hours', change: 12, trend: 'down' as const, description: 'Mean time to recovery', icon: <Target className="h-4 w-4" /> },
    ],
  }

  return baseMetrics[teamId as keyof typeof baseMetrics] || baseMetrics.all
}

const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
  switch (trend) {
    case 'up':
      return <ArrowUpRight className="h-4 w-4 text-green-600" />
    case 'down':
      return <ArrowDownRight className="h-4 w-4 text-red-600" />
    default:
      return <Minus className="h-4 w-4 text-gray-600" />
  }
}

export default function MetricsPage() {
  const [selectedTeam, setSelectedTeam] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d')

  const currentTeam = teams.find(team => team.id === selectedTeam) || teams[0]
  const metrics = getMetrics(selectedTeam)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Metrics</h1>
          <p className="text-muted-foreground">
            Track your team's engineering productivity and performance.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name} ({team.members} members)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Team Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {currentTeam.name}
          </CardTitle>
          <CardDescription>
            {currentTeam.members} team members • {currentTeam.projects} active projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Team Members</p>
                <p className="text-2xl font-bold">{currentTeam.members}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <GitBranch className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Active Projects</p>
                <p className="text-2xl font-bold">{currentTeam.projects}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                <Activity className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Velocity</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <div className="flex items-center space-x-1">
                {getTrendIcon(metric.trend)}
                <span className={`text-xs font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {Math.abs(metric.change)}%
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="comparison">Team Comparison</TabsTrigger>
          <TabsTrigger value="details">Detailed Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Time Trend</CardTitle>
                <CardDescription>Average lead time over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deployment Frequency</CardTitle>
                <CardDescription>Daily deployment frequency trend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Comparison</CardTitle>
              <CardDescription>Compare metrics across all teams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teams.filter(team => team.id !== 'all').map((team) => (
                  <div key={team.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-sm text-muted-foreground">{team.members} members</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm font-medium">Lead Time</p>
                        <p className="text-lg font-bold">{getMetrics(team.id)[0].value}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Deployments</p>
                        <p className="text-lg font-bold">{getMetrics(team.id)[1].value}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">PR Time</p>
                        <p className="text-lg font-bold">{getMetrics(team.id)[2].value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Metrics Breakdown</CardTitle>
              <CardDescription>In-depth analysis of each metric</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {metrics.map((metric) => (
                  <div key={metric.name} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{metric.name}</h3>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(metric.trend)}
                        <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'}>
                          {metric.trend === 'up' ? 'Improving' : 'Needs Attention'}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{metric.description}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Current Value</p>
                        <p className="font-medium">{metric.value}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Change</p>
                        <p className={`font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Target</p>
                        <p className="font-medium">Optimize</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 