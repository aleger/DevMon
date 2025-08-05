"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  GitBranch, 
  Users, 
  Zap,
  Bell,
  BellOff,
  Filter,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

interface AlertItem {
  id: string
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: 'sprint' | 'performance' | 'security' | 'deployment' | 'team'
  status: 'active' | 'acknowledged' | 'resolved'
  teamId: string
  teamName: string
  createdAt: string
  updatedAt: string
  assignee?: string
  priority: number
}

const mockAlerts: AlertItem[] = [
  {
    id: '1',
    title: 'Sprint Velocity Drop',
    description: 'Team "ciro - IRP 1" velocity has dropped by 25% compared to last sprint',
    severity: 'high',
    category: 'sprint',
    status: 'active',
    teamId: 'ciro-irp-1',
    teamName: 'ciro - IRP 1',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T10:30:00Z',
    priority: 1
  },
  {
    id: '2',
    title: 'Deployment Failure',
    description: 'Deployment to production environment failed due to database connection issues',
    severity: 'critical',
    category: 'deployment',
    status: 'active',
    teamId: 'ciro-irp-2',
    teamName: 'ciro - IRP 2',
    createdAt: '2024-01-20T09:15:00Z',
    updatedAt: '2024-01-20T09:15:00Z',
    assignee: 'Sarah Johnson',
    priority: 1
  },
  {
    id: '3',
    title: 'Code Review Backlog',
    description: '15 pull requests waiting for review for more than 24 hours',
    severity: 'medium',
    category: 'performance',
    status: 'acknowledged',
    teamId: 'ciro-irp-1',
    teamName: 'ciro - IRP 1',
    createdAt: '2024-01-19T16:45:00Z',
    updatedAt: '2024-01-20T08:20:00Z',
    assignee: 'Mike Chen',
    priority: 2
  },
  {
    id: '4',
    title: 'Security Vulnerability',
    description: 'High severity vulnerability detected in dependency package',
    severity: 'critical',
    category: 'security',
    status: 'active',
    teamId: 'ciro-irp-2',
    teamName: 'ciro - IRP 2',
    createdAt: '2024-01-20T07:30:00Z',
    updatedAt: '2024-01-20T07:30:00Z',
    priority: 1
  },
  {
    id: '5',
    title: 'Team Member Overload',
    description: '3 team members have exceeded 80% capacity for the current sprint',
    severity: 'medium',
    category: 'team',
    status: 'active',
    teamId: 'ciro-irp-1',
    teamName: 'ciro - IRP 1',
    createdAt: '2024-01-19T14:20:00Z',
    updatedAt: '2024-01-19T14:20:00Z',
    priority: 3
  },
  {
    id: '6',
    title: 'Performance Degradation',
    description: 'API response times have increased by 40% in the last hour',
    severity: 'high',
    category: 'performance',
    status: 'resolved',
    teamId: 'ciro-irp-2',
    teamName: 'ciro - IRP 2',
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-19T15:30:00Z',
    assignee: 'Alex Thompson',
    priority: 2
  }
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'low':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'sprint':
      return <Clock className="h-4 w-4" />
    case 'performance':
      return <TrendingDown className="h-4 w-4" />
    case 'security':
      return <AlertCircle className="h-4 w-4" />
    case 'deployment':
      return <GitBranch className="h-4 w-4" />
    case 'team':
      return <Users className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-red-100 text-red-800'
    case 'acknowledged':
      return 'bg-yellow-100 text-yellow-800'
    case 'resolved':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>(mockAlerts)
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedTeam, setSelectedTeam] = useState<string>('all')

  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = selectedSeverity === 'all' || alert.severity === selectedSeverity
    const categoryMatch = selectedCategory === 'all' || alert.category === selectedCategory
    const statusMatch = selectedStatus === 'all' || alert.status === selectedStatus
    const teamMatch = selectedTeam === 'all' || alert.teamId === selectedTeam

    return severityMatch && categoryMatch && statusMatch && teamMatch
  })

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'acknowledged' as const, updatedAt: new Date().toISOString() }
        : alert
    ))
  }

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' as const, updatedAt: new Date().toISOString() }
        : alert
    ))
  }

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  const activeAlerts = alerts.filter(alert => alert.status === 'active')
  const acknowledgedAlerts = alerts.filter(alert => alert.status === 'acknowledged')
  const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground">
            Monitor and manage system alerts and notifications.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Alert Settings
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{activeAlerts.length}</p>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{acknowledgedAlerts.length}</p>
                <p className="text-sm text-muted-foreground">Acknowledged</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{resolvedAlerts.length}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{alerts.filter(a => a.severity === 'critical').length}</p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="sprint">Sprint</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="deployment">Deployment</SelectItem>
                <SelectItem value="team">Team</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="ciro-irp-1">ciro - IRP 1</SelectItem>
                <SelectItem value="ciro-irp-2">ciro - IRP 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Alerts ({filteredAlerts.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeAlerts.length})</TabsTrigger>
          <TabsTrigger value="acknowledged">Acknowledged ({acknowledgedAlerts.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedAlerts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <Alert key={alert.id} className="border-l-4 border-l-red-500">
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-start space-x-3">
                    {getCategoryIcon(alert.category)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{alert.teamName}</span>
                        <span>{new Date(alert.createdAt).toLocaleString()}</span>
                        {alert.assignee && <span>Assigned to {alert.assignee}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {alert.status === 'active' && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => acknowledgeAlert(alert.id)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Acknowledge
                        </Button>
                        <Button size="sm" onClick={() => resolveAlert(alert.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                      </>
                    )}
                    {alert.status === 'acknowledged' && (
                      <Button size="sm" onClick={() => resolveAlert(alert.id)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolve
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => dismissAlert(alert.id)}>
                      <BellOff className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <Alert key={alert.id} className="border-l-4 border-l-red-500">
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-start space-x-3">
                    {getCategoryIcon(alert.category)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{alert.teamName}</span>
                        <span>{new Date(alert.createdAt).toLocaleString()}</span>
                        {alert.assignee && <span>Assigned to {alert.assignee}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => acknowledgeAlert(alert.id)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Acknowledge
                    </Button>
                    <Button size="sm" onClick={() => resolveAlert(alert.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Resolve
                    </Button>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="acknowledged" className="space-y-4">
          <div className="space-y-4">
            {acknowledgedAlerts.map((alert) => (
              <Alert key={alert.id} className="border-l-4 border-l-yellow-500">
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-start space-x-3">
                    {getCategoryIcon(alert.category)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{alert.teamName}</span>
                        <span>Acknowledged: {new Date(alert.updatedAt).toLocaleString()}</span>
                        {alert.assignee && <span>Assigned to {alert.assignee}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" onClick={() => resolveAlert(alert.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Resolve
                    </Button>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <div className="space-y-4">
            {resolvedAlerts.map((alert) => (
              <Alert key={alert.id} className="border-l-4 border-l-green-500">
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-start space-x-3">
                    {getCategoryIcon(alert.category)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{alert.teamName}</span>
                        <span>Resolved: {new Date(alert.updatedAt).toLocaleString()}</span>
                        {alert.assignee && <span>Resolved by {alert.assignee}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 