"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { 
  GitBranch, 
  Plus, 
  Settings, 
  Trash2, 
  Edit, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Key,
  Globe,
  Database,
  Zap,
  Shield,
  Users,
  GitPullRequest,
  GitCommit,
  GitMerge,
  GitBranch as GitBranchIcon,
  Store,
  Search,
  Filter
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  category: 'version-control' | 'project-management' | 'ci-cd' | 'monitoring' | 'communication'
  status: 'connected' | 'not_connected' | 'error' | 'configuring'
  icon: string
  color: string
  config?: {
    url?: string
    token?: string
    username?: string
    project?: string
    organization?: string
  }
  lastSync?: string
  errorMessage?: string
  installedAt?: string
  version?: string
  publisher?: string
}

const availableIntegrations: Integration[] = [
  // Version Control Systems
  {
    id: 'azure-devops-git',
    name: 'Azure DevOps Git',
    description: 'Git repositories hosted on Azure DevOps',
    category: 'version-control',
    status: 'not_connected',
    icon: 'GitBranch',
    color: 'blue',
    version: '2.1.0',
    publisher: 'Microsoft'
  },
  {
    id: 'bitbucket',
    name: 'Bitbucket',
    description: 'Git repositories hosted on Bitbucket',
    category: 'version-control',
    status: 'not_connected',
    icon: 'GitBranch',
    color: 'blue',
    version: '1.9.2',
    publisher: 'Atlassian'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Git repositories hosted on GitHub',
    category: 'version-control',
    status: 'connected',
    icon: 'GitBranch',
    color: 'purple',
    version: '3.0.1',
    publisher: 'GitHub',
    installedAt: '2024-01-15T10:30:00Z',
    lastSync: '2024-01-20T15:45:00Z'
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Git repositories hosted on GitLab',
    category: 'version-control',
    status: 'not_connected',
    icon: 'GitBranch',
    color: 'orange',
    version: '2.0.3',
    publisher: 'GitLab Inc.'
  },
  {
    id: 'azure-devops-work-items',
    name: 'Azure DevOps Work Items',
    description: 'Work item tracking and project management',
    category: 'project-management',
    status: 'connected',
    icon: 'Database',
    color: 'green',
    version: '2.2.0',
    publisher: 'Microsoft',
    installedAt: '2024-01-10T14:20:00Z',
    lastSync: '2024-01-20T16:30:00Z'
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Issue tracking and project management',
    category: 'project-management',
    status: 'not_connected',
    icon: 'Database',
    color: 'blue',
    version: '2.5.1',
    publisher: 'Atlassian'
  },
  {
    id: 'azure-pipelines',
    name: 'Azure Pipelines',
    description: 'CI/CD pipeline monitoring',
    category: 'ci-cd',
    status: 'not_connected',
    icon: 'Zap',
    color: 'green',
    version: '1.8.4',
    publisher: 'Microsoft'
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    description: 'CI/CD pipeline monitoring',
    category: 'ci-cd',
    status: 'not_connected',
    icon: 'Zap',
    color: 'red',
    version: '1.7.2',
    publisher: 'Jenkins Community'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication and notifications',
    category: 'communication',
    status: 'not_connected',
    icon: 'Users',
    color: 'purple',
    version: '2.3.0',
    publisher: 'Slack Technologies'
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Team communication and notifications',
    category: 'communication',
    status: 'not_connected',
    icon: 'Users',
    color: 'blue',
    version: '1.9.1',
    publisher: 'Microsoft'
  }
]

export default function IntegrationsSettingsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(availableIntegrations)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [configData, setConfigData] = useState({
    url: '',
    token: '',
    username: '',
    project: '',
    organization: ''
  })

  const connectedIntegrations = integrations.filter(i => i.status === 'connected')
  const availableIntegrationsList = integrations.filter(i => i.status === 'not_connected')
  const errorIntegrations = integrations.filter(i => i.status === 'error')

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleConnect = (integrationId: string) => {
    setSelectedIntegration(integrations.find(i => i.id === integrationId) || null)
    setIsConfiguring(true)
  }

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: 'not_connected' as const, config: undefined, lastSync: undefined, errorMessage: undefined }
          : integration
      )
    )
  }

  const handleEdit = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId)
    if (integration) {
      setSelectedIntegration(integration)
      setConfigData({
        url: integration.config?.url || '',
        token: integration.config?.token || '',
        username: integration.config?.username || '',
        project: integration.config?.project || '',
        organization: integration.config?.organization || ''
      })
      setIsConfiguring(true)
    }
  }

  const handleSaveConfig = async () => {
    if (!selectedIntegration) return

    setIsConfiguring(false)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === selectedIntegration.id 
          ? { 
              ...integration, 
              status: 'connected' as const,
              config: configData,
              lastSync: new Date().toISOString(),
              installedAt: integration.installedAt || new Date().toISOString(),
              errorMessage: undefined
            }
          : integration
      )
    )
    
    setSelectedIntegration(null)
    setConfigData({ url: '', token: '', username: '', project: '', organization: '' })
  }

  const handleTestConnection = async () => {
    if (!selectedIntegration) return

    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // For demo purposes, assume connection is successful
    setSelectedIntegration(prev => prev ? { ...prev, status: 'configuring' as const } : null)
  }

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      purple: 'bg-purple-100 text-purple-600'
    }
    return colorMap[color] || 'bg-gray-100 text-gray-600'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'configuring':
        return <RefreshCw className="h-4 w-4 text-yellow-600 animate-spin" />
      default:
        return <GitBranch className="h-4 w-4 text-gray-600" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'version-control':
        return 'Version Control'
      case 'project-management':
        return 'Project Management'
      case 'ci-cd':
        return 'CI/CD'
      case 'monitoring':
        return 'Monitoring'
      case 'communication':
        return 'Communication'
      default:
        return category
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">
            Manage your connected services and integrations.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/settings/integrations/marketplace">
            <Button>
              <Store className="h-4 w-4 mr-2" />
              Browse Marketplace
            </Button>
          </Link>
        </div>
      </div>

      {/* Integration Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{connectedIntegrations.length}</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <GitBranch className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{availableIntegrationsList.length}</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{errorIntegrations.length}</p>
                <p className="text-sm text-muted-foreground">Errors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'configuring').length}</p>
                <p className="text-sm text-muted-foreground">Configuring</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="version-control">Version Control</SelectItem>
                <SelectItem value="project-management">Project Management</SelectItem>
                <SelectItem value="ci-cd">CI/CD</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Integrations by Category */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Integrations ({filteredIntegrations.length})</TabsTrigger>
          <TabsTrigger value="connected">Connected ({connectedIntegrations.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableIntegrationsList.length})</TabsTrigger>
          <TabsTrigger value="errors">Errors ({errorIntegrations.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Integrations</CardTitle>
              <CardDescription>
                Manage all your integrations in one place
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredIntegrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(integration.color)}`}>
                      <GitBranch className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="font-medium">{integration.name}</div>
                        <Badge variant="outline" className="text-xs">
                          {getCategoryName(integration.category)}
                        </Badge>
                        {integration.version && (
                          <Badge variant="outline" className="text-xs">
                            v{integration.version}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{integration.description}</div>
                      {integration.publisher && (
                        <div className="text-xs text-muted-foreground">by {integration.publisher}</div>
                      )}
                      {integration.lastSync && (
                        <div className="text-xs text-muted-foreground">
                          Last sync: {new Date(integration.lastSync).toLocaleString()}
                        </div>
                      )}
                      {integration.errorMessage && (
                        <div className="text-xs text-red-600">
                          Error: {integration.errorMessage}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(integration.status)}
                    <Badge variant={integration.status === 'connected' ? 'secondary' : 'outline'}>
                      {integration.status === 'connected' ? 'Connected' : 
                       integration.status === 'error' ? 'Error' :
                       integration.status === 'configuring' ? 'Configuring' : 'Not Connected'}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {integration.status === 'connected' && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(integration.id)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDisconnect(integration.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                      {integration.status === 'not_connected' && (
                        <Button size="sm" onClick={() => handleConnect(integration.id)}>
                          Connect
                        </Button>
                      )}
                      {integration.status === 'error' && (
                        <Button size="sm" onClick={() => handleEdit(integration.id)}>
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Integrations</CardTitle>
              <CardDescription>
                Active integrations that are currently connected and syncing data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {connectedIntegrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(integration.color)}`}>
                      <GitBranch className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="font-medium">{integration.name}</div>
                        <Badge variant="outline" className="text-xs">
                          {getCategoryName(integration.category)}
                        </Badge>
                        {integration.version && (
                          <Badge variant="outline" className="text-xs">
                            v{integration.version}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{integration.description}</div>
                      {integration.lastSync && (
                        <div className="text-xs text-muted-foreground">
                          Last sync: {new Date(integration.lastSync).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <Badge variant="secondary">Connected</Badge>
                    <div className="flex items-center space-x-1">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(integration.id)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDisconnect(integration.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Integrations</CardTitle>
              <CardDescription>
                Integrations that are available to install and configure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableIntegrationsList.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(integration.color)}`}>
                      <GitBranch className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="font-medium">{integration.name}</div>
                        <Badge variant="outline" className="text-xs">
                          {getCategoryName(integration.category)}
                        </Badge>
                        {integration.version && (
                          <Badge variant="outline" className="text-xs">
                            v{integration.version}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{integration.description}</div>
                      {integration.publisher && (
                        <div className="text-xs text-muted-foreground">by {integration.publisher}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GitBranch className="h-4 w-4 text-gray-600" />
                    <Badge variant="outline">Not Connected</Badge>
                    <Button size="sm" onClick={() => handleConnect(integration.id)}>
                      Connect
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Errors</CardTitle>
              <CardDescription>
                Integrations that have configuration issues or connection problems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {errorIntegrations.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No errors found</h3>
                  <p className="text-muted-foreground">All your integrations are working properly.</p>
                </div>
              ) : (
                errorIntegrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(integration.color)}`}>
                        <GitBranch className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className="font-medium">{integration.name}</div>
                          <Badge variant="outline" className="text-xs">
                            {getCategoryName(integration.category)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{integration.description}</div>
                        {integration.errorMessage && (
                          <div className="text-xs text-red-600">
                            Error: {integration.errorMessage}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <Badge variant="destructive">Error</Badge>
                      <Button size="sm" onClick={() => handleEdit(integration.id)}>
                        Retry
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Configuration Modal */}
      {isConfiguring && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Configure {selectedIntegration.name}</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsConfiguring(false)}>
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  placeholder="https://dev.azure.com/your-org"
                  value={configData.url}
                  onChange={(e) => setConfigData(prev => ({ ...prev, url: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  placeholder="your-organization"
                  value={configData.organization}
                  onChange={(e) => setConfigData(prev => ({ ...prev, organization: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="project">Project</Label>
                <Input
                  id="project"
                  placeholder="your-project"
                  value={configData.project}
                  onChange={(e) => setConfigData(prev => ({ ...prev, project: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="your-username"
                  value={configData.username}
                  onChange={(e) => setConfigData(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="token">Personal Access Token</Label>
                <Input
                  id="token"
                  type="password"
                  placeholder="Enter your PAT"
                  value={configData.token}
                  onChange={(e) => setConfigData(prev => ({ ...prev, token: e.target.value }))}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button onClick={handleTestConnection} disabled={selectedIntegration.status === 'configuring'}>
                  {selectedIntegration.status === 'configuring' ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Test Connection
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setIsConfiguring(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveConfig}>
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 