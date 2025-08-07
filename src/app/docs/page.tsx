import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs'
import { 
  BarChart3, 
  BookOpen,
  Search,
  Zap,
  GitBranch,
  Users,
  Brain,
  Shield,
  Settings,
  ArrowRight,
  Play,
  Sparkles,
  Rocket,
  Clock,
  GitCommit,
  GitPullRequest,
  GitMerge,
  Target,
  AlertTriangle,
  CheckCircle,
  Activity,
  Calendar,
  Database,
  Globe,
  Lock,
  Star,
  FileText,
  Code,
  Terminal,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

export default async function DocsPage() {
  const { userId } = await auth()
  const isLoggedIn = !!userId

  const quickStartSteps = [
    {
      icon: GitBranch,
      title: 'Connect Your Tools',
      description: 'Integrate with Azure DevOps, Jira, or other development tools',
      link: '/docs/integrations',
      color: 'text-green-600'
    },
    {
      icon: BarChart3,
      title: 'View Your Metrics',
      description: 'See real-time metrics and performance indicators',
      link: '/docs/metrics',
      color: 'text-blue-600'
    },
    {
      icon: Brain,
      title: 'Get AI Insights',
      description: 'Receive AI-powered predictions and recommendations',
      link: '/docs/ai-predictions',
      color: 'text-orange-600'
    },
    {
      icon: Users,
      title: 'Manage Your Team',
      description: 'Set up team analytics and collaboration features',
      link: '/docs/team-management',
      color: 'text-purple-600'
    }
  ]

  const documentationSections = [
    {
      title: 'Getting Started',
      description: 'Quick setup and first steps',
      icon: Rocket,
      color: 'text-blue-600',
      items: [
        { name: 'Quick Start Guide', href: '/docs/quick-start' },
        { name: 'Account Setup', href: '/docs/account-setup' },
        { name: 'First Integration', href: '/docs/first-integration' },
        { name: 'Dashboard Overview', href: '/docs/dashboard' }
      ]
    },
    {
      title: 'Integrations',
      description: 'Connect your development tools',
      icon: GitBranch,
      color: 'text-green-600',
      items: [
        { name: 'Azure DevOps', href: '/docs/integrations/azure-devops' },
        { name: 'Jira', href: '/docs/integrations/jira' },
        { name: 'GitHub (Coming Soon)', href: '/docs/integrations/github' },
        { name: 'GitLab (Coming Soon)', href: '/docs/integrations/gitlab' }
      ]
    },
    {
      title: 'Metrics & Analytics',
      description: 'Understanding your engineering metrics',
      icon: BarChart3,
      color: 'text-purple-600',
      items: [
        { name: 'Lead Time for Changes', href: '/docs/metrics/lead-time' },
        { name: 'Deployment Frequency', href: '/docs/metrics/deployment-frequency' },
        { name: 'PR Cycle Time', href: '/docs/metrics/pr-cycle-time' },
        { name: 'Team Velocity', href: '/docs/metrics/team-velocity' }
      ]
    },
    {
      title: 'AI Predictions',
      description: 'AI-powered insights and recommendations',
      icon: Brain,
      color: 'text-orange-600',
      items: [
        { name: 'Sprint Risk Analysis', href: '/docs/ai/sprint-risk' },
        { name: 'Team Health Monitoring', href: '/docs/ai/team-health' },
        { name: 'Capacity Planning', href: '/docs/ai/capacity-planning' },
        { name: 'Quality Predictions', href: '/docs/ai/quality-predictions' }
      ]
    },
    {
      title: 'Team Management',
      description: 'Managing teams and collaboration',
      icon: Users,
      color: 'text-indigo-600',
      items: [
        { name: 'Team Setup', href: '/docs/teams/setup' },
        { name: 'Sprint Management', href: '/docs/teams/sprints' },
        { name: 'Performance Tracking', href: '/docs/teams/performance' },
        { name: 'Collaboration Tools', href: '/docs/teams/collaboration' }
      ]
    },
    {
      title: 'Security & Compliance',
      description: 'Security features and data protection',
      icon: Shield,
      color: 'text-red-600',
      items: [
        { name: 'Authentication', href: '/docs/security/authentication' },
        { name: 'Data Encryption', href: '/docs/security/encryption' },
        { name: 'Access Control', href: '/docs/security/access-control' },
        { name: 'Compliance', href: '/docs/security/compliance' }
      ]
    }
  ]

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/metrics',
      description: 'Retrieve metrics data',
      auth: 'Required'
    },
    {
      method: 'POST',
      endpoint: '/api/integrations/azure-devops',
      description: 'Connect Azure DevOps integration',
      auth: 'Required'
    },
    {
      method: 'GET',
      endpoint: '/api/predictions',
      description: 'Get AI predictions',
      auth: 'Required'
    },
    {
      method: 'GET',
      endpoint: '/api/teams',
      description: 'Retrieve team data',
      auth: 'Required'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">DevMon</span>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm font-medium hover:text-primary">
              Docs
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 text-center">
        <Badge variant="secondary" className="mb-4">
          <BookOpen className="mr-2 h-4 w-4" />
          Documentation
        </Badge>
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
          DevMon Documentation
          <span className="block text-primary"> & User Guide</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Everything you need to know about using DevMon to track and improve your engineering productivity.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="h-10 w-80 rounded-md border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button asChild>
            <Link href="/docs/quick-start">
              <Play className="mr-2 h-4 w-4" />
              Quick Start
            </Link>
          </Button>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="container py-24 bg-background">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Quick Start Guide</h2>
          <p className="text-lg text-muted-foreground">
            Get up and running with DevMon in just a few steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStartSteps.map((step, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4`}>
                  <step.icon className={`h-6 w-6 ${step.color}`} />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link href={step.link}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Documentation</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive guides for all DevMon features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentationSections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4`}>
                  <section.icon className={`h-6 w-6 ${section.color}`} />
                </div>
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* API Reference */}
      <section className="container py-24 bg-background">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">API Reference</h2>
          <p className="text-lg text-muted-foreground">
            Integrate DevMon with your own applications
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-5 w-5" />
                REST API Endpoints
              </CardTitle>
              <CardDescription>
                All API endpoints require authentication. Use your API key in the Authorization header.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {endpoint.endpoint}
                      </code>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{endpoint.description}</div>
                      <div className="text-xs text-muted-foreground">Auth: {endpoint.auth}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" asChild>
                  <Link href="/docs/api">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Full API Documentation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Help & Support */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-lg text-muted-foreground">
            Get support and connect with our community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>
                Search our comprehensive knowledge base for answers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link href="/docs/knowledge-base">
                  Browse Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Community</CardTitle>
              <CardDescription>
                Join our community forum for discussions and tips
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link href="/docs/community">
                  Join Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Get help from our technical support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link href="/docs/support">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-8 opacity-90">
              Start tracking your engineering metrics today with DevMon.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/sign-up">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/features">
                  View Features
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
