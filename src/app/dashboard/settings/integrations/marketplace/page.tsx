"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search,
  Filter,
  Star,
  Download,
  ExternalLink,
  GitBranch,
  Database,
  Zap,
  Users,
  Shield,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  Globe
} from 'lucide-react'

interface MarketplaceIntegration {
  id: string
  name: string
  description: string
  category: 'version-control' | 'project-management' | 'ci-cd' | 'monitoring' | 'communication'
  status: 'available' | 'installed' | 'premium'
  icon: string
  color: string
  rating: number
  downloads: number
  version: string
  publisher: string
  features: string[]
  pricing: 'free' | 'freemium' | 'paid'
  lastUpdated: string
  compatibility: string[]
  documentation?: string
  website?: string
}

const marketplaceIntegrations: MarketplaceIntegration[] = [
  // Version Control Systems
  {
    id: 'azure-devops-git',
    name: 'Azure DevOps Git',
    description: 'Connect to Azure DevOps Git repositories for code monitoring and metrics',
    category: 'version-control',
    status: 'available',
    icon: 'GitBranch',
    color: 'blue',
    rating: 4.8,
    downloads: 15420,
    version: '2.1.0',
    publisher: 'Microsoft',
    features: ['Repository monitoring', 'Branch protection', 'Code review analytics', 'Commit tracking'],
    pricing: 'free',
    lastUpdated: '2024-01-15',
    compatibility: ['Azure DevOps', 'Git'],
    documentation: 'https://docs.microsoft.com/en-us/azure/devops/',
    website: 'https://azure.microsoft.com/en-us/services/devops/'
  },
  {
    id: 'bitbucket',
    name: 'Bitbucket',
    description: 'Integrate with Bitbucket repositories for comprehensive code analytics',
    category: 'version-control',
    status: 'available',
    icon: 'GitBranch',
    color: 'blue',
    rating: 4.6,
    downloads: 12850,
    version: '1.9.2',
    publisher: 'Atlassian',
    features: ['Repository monitoring', 'Pull request analytics', 'Branch insights', 'Code quality metrics'],
    pricing: 'freemium',
    lastUpdated: '2024-01-10',
    compatibility: ['Bitbucket Cloud', 'Bitbucket Server', 'Git'],
    documentation: 'https://support.atlassian.com/bitbucket-cloud/',
    website: 'https://bitbucket.org/'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Connect to GitHub repositories for advanced development analytics',
    category: 'version-control',
    status: 'installed',
    icon: 'GitBranch',
    color: 'purple',
    rating: 4.9,
    downloads: 25680,
    version: '3.0.1',
    publisher: 'GitHub',
    features: ['Repository monitoring', 'Actions analytics', 'Security scanning', 'Dependency tracking'],
    pricing: 'freemium',
    lastUpdated: '2024-01-20',
    compatibility: ['GitHub', 'GitHub Enterprise', 'Git'],
    documentation: 'https://docs.github.com/',
    website: 'https://github.com/'
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Integrate with GitLab for comprehensive DevOps analytics',
    category: 'version-control',
    status: 'available',
    icon: 'GitBranch',
    color: 'orange',
    rating: 4.5,
    downloads: 9870,
    version: '2.0.3',
    publisher: 'GitLab Inc.',
    features: ['Repository monitoring', 'CI/CD analytics', 'Security scanning', 'Code quality'],
    pricing: 'freemium',
    lastUpdated: '2024-01-12',
    compatibility: ['GitLab', 'GitLab Enterprise', 'Git'],
    documentation: 'https://docs.gitlab.com/',
    website: 'https://gitlab.com/'
  },
  // Project Management
  {
    id: 'azure-devops-work-items',
    name: 'Azure DevOps Work Items',
    description: 'Track work items and project management in Azure DevOps',
    category: 'project-management',
    status: 'available',
    icon: 'Database',
    color: 'green',
    rating: 4.7,
    downloads: 12340,
    version: '2.2.0',
    publisher: 'Microsoft',
    features: ['Work item tracking', 'Sprint analytics', 'Team velocity', 'Backlog management'],
    pricing: 'free',
    lastUpdated: '2024-01-18',
    compatibility: ['Azure DevOps', 'Agile', 'Scrum'],
    documentation: 'https://docs.microsoft.com/en-us/azure/devops/boards/',
    website: 'https://azure.microsoft.com/en-us/services/devops/'
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Connect to Jira for comprehensive project and issue tracking',
    category: 'project-management',
    status: 'available',
    icon: 'Database',
    color: 'blue',
    rating: 4.6,
    downloads: 18920,
    version: '2.5.1',
    publisher: 'Atlassian',
    features: ['Issue tracking', 'Sprint planning', 'Agile metrics', 'Project analytics'],
    pricing: 'freemium',
    lastUpdated: '2024-01-14',
    compatibility: ['Jira Cloud', 'Jira Server', 'Agile', 'Scrum'],
    documentation: 'https://support.atlassian.com/jira-software-cloud/',
    website: 'https://www.atlassian.com/software/jira'
  },
  // CI/CD
  {
    id: 'azure-pipelines',
    name: 'Azure Pipelines',
    description: 'Monitor CI/CD pipelines in Azure DevOps',
    category: 'ci-cd',
    status: 'available',
    icon: 'Zap',
    color: 'green',
    rating: 4.8,
    downloads: 11230,
    version: '1.8.4',
    publisher: 'Microsoft',
    features: ['Pipeline monitoring', 'Build analytics', 'Deployment tracking', 'Release management'],
    pricing: 'free',
    lastUpdated: '2024-01-16',
    compatibility: ['Azure DevOps', 'YAML', 'Classic'],
    documentation: 'https://docs.microsoft.com/en-us/azure/devops/pipelines/',
    website: 'https://azure.microsoft.com/en-us/services/devops/pipelines/'
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    description: 'Monitor Jenkins CI/CD pipelines and builds',
    category: 'ci-cd',
    status: 'available',
    icon: 'Zap',
    color: 'red',
    rating: 4.4,
    downloads: 8760,
    version: '1.7.2',
    publisher: 'Jenkins Community',
    features: ['Pipeline monitoring', 'Build analytics', 'Job tracking', 'Plugin management'],
    pricing: 'free',
    lastUpdated: '2024-01-08',
    compatibility: ['Jenkins', 'Groovy', 'Pipeline'],
    documentation: 'https://www.jenkins.io/doc/',
    website: 'https://www.jenkins.io/'
  },
  // Communication
  {
    id: 'slack',
    name: 'Slack',
    description: 'Integrate with Slack for team notifications and alerts',
    category: 'communication',
    status: 'available',
    icon: 'Users',
    color: 'purple',
    rating: 4.7,
    downloads: 14560,
    version: '2.3.0',
    publisher: 'Slack Technologies',
    features: ['Team notifications', 'Alert integration', 'Channel management', 'Webhook support'],
    pricing: 'freemium',
    lastUpdated: '2024-01-19',
    compatibility: ['Slack', 'Webhooks', 'API'],
    documentation: 'https://api.slack.com/',
    website: 'https://slack.com/'
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Connect to Microsoft Teams for team collaboration and notifications',
    category: 'communication',
    status: 'available',
    icon: 'Users',
    color: 'blue',
    rating: 4.5,
    downloads: 9870,
    version: '1.9.1',
    publisher: 'Microsoft',
    features: ['Team notifications', 'Channel integration', 'Webhook support', 'Bot integration'],
    pricing: 'freemium',
    lastUpdated: '2024-01-11',
    compatibility: ['Microsoft Teams', 'Office 365', 'Webhooks'],
    documentation: 'https://docs.microsoft.com/en-us/microsoftteams/',
    website: 'https://www.microsoft.com/en-us/microsoft-teams'
  }
]

export default function IntegrationMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPricing, setSelectedPricing] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('popular')

  const filteredIntegrations = marketplaceIntegrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory
    const matchesPricing = selectedPricing === 'all' || integration.pricing === selectedPricing
    
    return matchesSearch && matchesCategory && matchesPricing
  })

  const sortedIntegrations = [...filteredIntegrations].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads
      case 'rating':
        return b.rating - a.rating
      case 'recent':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleInstall = (integrationId: string) => {
    // In a real app, this would trigger the installation process
    console.log(`Installing integration: ${integrationId}`)
    // Navigate to configuration page or show installation modal
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'version-control':
        return <GitBranch className="h-4 w-4" />
      case 'project-management':
        return <Database className="h-4 w-4" />
      case 'ci-cd':
        return <Zap className="h-4 w-4" />
      case 'communication':
        return <Users className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getPricingBadge = (pricing: string) => {
    switch (pricing) {
      case 'free':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Free</Badge>
      case 'freemium':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Freemium</Badge>
      case 'paid':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Paid</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'installed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Installed</Badge>
      case 'premium':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Premium</Badge>
      default:
        return <Badge variant="outline">Available</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integration Marketplace</h1>
        <p className="text-muted-foreground">
          Discover and install integrations to enhance your development workflow.
        </p>
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

            <Select value={selectedPricing} onValueChange={setSelectedPricing}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Pricing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="freemium">Freemium</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="recent">Recently Updated</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedIntegrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${integration.color}-100`}>
                    {getCategoryIcon(integration.category)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{integration.publisher}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {getPricingBadge(integration.pricing)}
                  {getStatusBadge(integration.status)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{integration.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{integration.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="h-4 w-4" />
                  <span>{integration.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>v{integration.version}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {integration.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {integration.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{integration.features.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  {integration.documentation && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={integration.documentation} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {integration.website && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={integration.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {integration.status === 'installed' ? (
                    <Button variant="outline" size="sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Installed
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => handleInstall(integration.id)}>
                      <Download className="h-4 w-4 mr-1" />
                      Install
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedIntegrations.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Search className="h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">No integrations found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 