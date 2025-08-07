import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs'
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  GitBranch, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Activity,
  Target,
  Brain,
  Shield,
  Bell,
  CreditCard,
  Database,
  Globe,
  Lock,
  Star,
  ArrowRight,
  Play,
  Sparkles,
  Rocket,
  Award,
  Clock,
  GitCommit,
  GitPullRequest,
  GitMerge,
  Calendar,
  PieChart,
  LineChart,
  Target as TargetIcon,
  Users as TeamIcon,
  Settings,
  Bell as NotificationIcon,
  Shield as SecurityIcon,
  CreditCard as BillingIcon
} from 'lucide-react'
import Link from 'next/link'

export default async function FeaturesPage() {
  const { userId } = await auth()
  const isLoggedIn = !!userId
  const coreMetrics = [
    {
      icon: Clock,
      title: 'Lead Time for Changes',
      description: 'Measure time from commit to deployment with precision',
      color: 'text-blue-600'
    },
    {
      icon: GitCommit,
      title: 'Deployment Frequency',
      description: 'Track how often code is deployed to production',
      color: 'text-green-600'
    },
    {
      icon: GitPullRequest,
      title: 'PR Cycle Time',
      description: 'Monitor pull request review and merge times',
      color: 'text-purple-600'
    },
    {
      icon: Target,
      title: 'Issue Throughput',
      description: 'Track story point completion rates and team velocity',
      color: 'text-orange-600'
    },
    {
      icon: GitMerge,
      title: 'Code Review Time',
      description: 'Measure review efficiency and quality',
      color: 'text-indigo-600'
    },
    {
      icon: AlertTriangle,
      title: 'Mean Time to Recovery',
      description: 'Track incident resolution times and system reliability',
      color: 'text-red-600'
    },
    {
      icon: CheckCircle,
      title: 'Change Failure Rate',
      description: 'Monitor deployment success rates and code quality',
      color: 'text-emerald-600'
    },
    {
      icon: TrendingUp,
      title: 'Team Velocity',
      description: 'Track sprint completion rates and planning accuracy',
      color: 'text-cyan-600'
    }
  ]

  const aiPredictions = [
    {
      icon: AlertTriangle,
      title: 'Sprint Spillover Risk',
      description: 'Predicts likelihood of missing sprint goals with 85% accuracy',
      color: 'text-red-600'
    },
    {
      icon: Users,
      title: 'Team Burnout Risk',
      description: 'Identifies potential team burnout indicators early',
      color: 'text-orange-600'
    },
    {
      icon: Clock,
      title: 'Delivery Delay Risk',
      description: 'Predicts project timeline risks before they impact delivery',
      color: 'text-yellow-600'
    },
    {
      icon: Shield,
      title: 'Quality Degradation Risk',
      description: 'Identifies potential quality issues before they reach production',
      color: 'text-purple-600'
    },
    {
      icon: Target,
      title: 'Capacity Overload Risk',
      description: 'Predicts team capacity issues and resource constraints',
      color: 'text-blue-600'
    }
  ]

  const integrations = [
    {
      name: 'Azure DevOps',
      description: 'Full integration with Azure DevOps REST API',
      features: ['Work Items', 'Pull Requests', 'Builds & Releases', 'Repositories'],
      status: 'Connected',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Jira',
      description: 'Comprehensive Jira API integration',
      features: ['Issues', 'Sprints', 'Projects', 'Workflows'],
      status: 'Connected',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'GitHub',
      description: 'Git-based metrics tracking (coming soon)',
      features: ['Repository Analytics', 'Actions Monitoring', 'Security Scanning'],
      status: 'Coming Soon',
      color: 'bg-gray-100 text-gray-800'
    },
    {
      name: 'GitLab',
      description: 'GitLab integration (coming soon)',
      features: ['CI/CD Analytics', 'Code Quality', 'Security Scanning'],
      status: 'Coming Soon',
      color: 'bg-gray-100 text-gray-800'
    }
  ]

  const securityFeatures = [
    {
      icon: Lock,
      title: 'Clerk Authentication',
      description: 'Secure user authentication with multi-factor support'
    },
    {
      icon: Shield,
      title: 'Role-based Access Control',
      description: 'Granular permissions for teams and organizations'
    },
    {
      icon: Globe,
      title: 'API Security',
      description: 'JWT token validation and secure API endpoints'
    },
    {
      icon: Database,
      title: 'Data Encryption',
      description: 'Encrypted data storage with industry standards'
    },
    {
      icon: Award,
      title: 'SOC 2 Compliance',
      description: 'Enterprise security standards and compliance'
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
          <Sparkles className="mr-2 h-4 w-4" />
          AI-Powered Engineering Analytics
        </Badge>
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Everything you need to measure
          <span className="block text-primary"> engineering productivity</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          From lead time to deployment frequency, we track the metrics that matter. 
          Get AI-powered insights to improve your team's performance and delivery.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link href="/sign-up">
            <Button size="lg" className="group">
              <Rocket className="mr-2 h-4 w-4" />
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              <Play className="mr-2 h-4 w-4" />
              View Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Core Metrics Section */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Core Engineering Metrics</h2>
          <p className="text-lg text-muted-foreground">
            Track the essential metrics that drive engineering excellence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreMetrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <CardTitle className="text-lg">{metric.title}</CardTitle>
                <CardDescription>{metric.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Predictions Section */}
      <section className="container py-24 bg-background">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-3xl font-bold">AI-Powered Predictions</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Get ahead of issues before they impact your team
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiPredictions.map((prediction, index) => (
            <Card key={index} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4`}>
                  <prediction.icon className={`h-6 w-6 ${prediction.color}`} />
                </div>
                <CardTitle className="text-lg">{prediction.title}</CardTitle>
                <CardDescription>{prediction.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Integrations Section */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Seamless Integrations</h2>
          <p className="text-lg text-muted-foreground">
            Connect your existing tools and start tracking metrics instantly
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((integration, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-xl">{integration.name}</CardTitle>
                  <Badge className={integration.color}>{integration.status}</Badge>
                </div>
                <CardDescription className="text-base">{integration.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {integration.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Management Section */}
      <section className="container py-24 bg-background">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <TeamIcon className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-3xl font-bold">Team Management</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Manage your teams, track performance, and optimize collaboration
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Team Analytics</CardTitle>
              <CardDescription>
                Comprehensive team performance metrics and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Sprint velocity tracking
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Individual performance metrics
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Capacity planning tools
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Sprint Management</CardTitle>
              <CardDescription>
                Track sprint progress and predict completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Sprint burndown charts
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Risk prediction alerts
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Story point tracking
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Real-time Monitoring</CardTitle>
              <CardDescription>
                Live updates and instant notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Live dashboard updates
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Instant alert notifications
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Performance trend analysis
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <SecurityIcon className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-3xl font-bold">Security & Compliance</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Enterprise-grade security for your engineering data
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>



      {/* CTA Section */}
      <section className="container py-24">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your engineering metrics?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of engineering teams using DevMon to improve their productivity and delivery.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/sign-up">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">
                  <Play className="mr-2 h-5 w-5" />
                  View Demo
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
