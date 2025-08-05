import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  GitBranch, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap,
  Target,
  BarChart3
} from 'lucide-react'
import { MetricsOverview } from '@/components/dashboard/metrics-overview'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { PredictionsPanel } from '@/components/dashboard/predictions-panel'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your team today.
        </p>
      </div>

      {/* Key Metrics - High-level overview metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              +1 from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sprints</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <CheckCircle className="mr-1 h-3 w-3 text-green-600" />
              All on track
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Code Coverage</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              +5% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Predictions</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <AlertTriangle className="mr-1 h-3 w-3 text-yellow-600" />
              3 require attention
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Azure DevOps</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Jira</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Data Sync</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Sprint Risk</span>
                <Badge variant="destructive">High</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Code Review</span>
                <Badge variant="secondary">Normal</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Deployment</span>
                <Badge variant="secondary">Normal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left text-sm p-2 rounded hover:bg-muted">
                View Team Report
              </button>
              <button className="w-full text-left text-sm p-2 rounded hover:bg-muted">
                Add Integration
              </button>
              <button className="w-full text-left text-sm p-2 rounded hover:bg-muted">
                Configure Alerts
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Metrics Overview</CardTitle>
            <CardDescription>
              Key performance indicators over the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading metrics...</div>}>
              <MetricsOverview />
            </Suspense>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>AI Predictions</CardTitle>
            <CardDescription>
              AI-generated insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading predictions...</div>}>
              <PredictionsPanel />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates from your integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading activity...</div>}>
            <RecentActivity />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
} 