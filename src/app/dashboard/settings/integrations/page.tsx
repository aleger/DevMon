"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GitBranch, Plus } from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  status: 'connected' | 'not_connected'
  icon: string
  color: string
}

export default function IntegrationsSettingsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'github',
      name: 'GitHub',
      description: 'Repository monitoring',
      status: 'connected',
      icon: 'GitBranch',
      color: 'blue'
    },
    {
      id: 'azure-devops',
      name: 'Azure DevOps',
      description: 'Work item tracking',
      status: 'connected',
      icon: 'GitBranch',
      color: 'green'
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Issue tracking',
      status: 'not_connected',
      icon: 'GitBranch',
      color: 'orange'
    }
  ])

  const handleConnect = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: 'connected' as const }
          : integration
      )
    )
  }

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: 'not_connected' as const }
          : integration
      )
    )
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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Connected Integrations</CardTitle>
          <CardDescription>
            Manage your third-party integrations and API connections.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {integrations.map((integration) => (
            <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(integration.color)}`}>
                  <GitBranch className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">{integration.name}</div>
                  <div className="text-sm text-muted-foreground">{integration.description}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={integration.status === 'connected' ? 'secondary' : 'outline'}>
                  {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
                </Badge>
                <Button
                  variant={integration.status === 'connected' ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => 
                    integration.status === 'connected' 
                      ? handleDisconnect(integration.id)
                      : handleConnect(integration.id)
                  }
                >
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Integration
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>
          Save Changes
        </Button>
      </div>
    </>
  )
} 