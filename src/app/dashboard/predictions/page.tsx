"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Users, 
  Zap,
  Calendar,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Brain,
  Clock,
  GitBranch,
  BarChart3
} from 'lucide-react'

interface Team {
  id: string
  name: string
  members: number
  projects: number
}

interface Prediction {
  id: string
  title: string
  description: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  category: 'sprint' | 'performance' | 'risk' | 'opportunity'
  teamId: string
  predictedDate: string
  recommendations: string[]
}

interface SprintPrediction {
  teamId: string
  sprintNumber: number
  predictedVelocity: number
  confidence: number
  riskFactors: string[]
  recommendations: string[]
}

const teams: Team[] = [
  { id: 'all', name: 'All Teams', members: 24, projects: 8 },
  { id: 'frontend', name: 'Frontend Team', members: 6, projects: 3 },
  { id: 'backend', name: 'Backend Team', members: 8, projects: 4 },
  { id: 'mobile', name: 'Mobile Team', members: 5, projects: 2 },
  { id: 'qa', name: 'QA Team', members: 5, projects: 3 },
]

const getPredictions = (teamId: string): Prediction[] => {
  const basePredictions = {
    all: [
      {
        id: '1',
        title: 'Sprint 15 Velocity Drop',
        description: 'Predicted 15% decrease in velocity due to team member vacation',
        confidence: 85,
        impact: 'high' as const,
        category: 'sprint' as const,
        teamId: 'frontend',
        predictedDate: '2024-02-15',
        recommendations: ['Plan for reduced capacity', 'Prioritize critical features', 'Consider pair programming']
      },
      {
        id: '2',
        title: 'Deployment Risk Increase',
        description: 'Higher risk of deployment failures in next 2 weeks',
        confidence: 72,
        impact: 'medium' as const,
        category: 'risk' as const,
        teamId: 'backend',
        predictedDate: '2024-02-10',
        recommendations: ['Increase testing coverage', 'Add deployment safeguards', 'Review recent changes']
      },
      {
        id: '3',
        title: 'Performance Optimization Opportunity',
        description: 'Identified potential for 20% performance improvement',
        confidence: 68,
        impact: 'medium' as const,
        category: 'opportunity' as const,
        teamId: 'mobile',
        predictedDate: '2024-02-20',
        recommendations: ['Refactor critical components', 'Implement caching strategy', 'Optimize database queries']
      }
    ],
    frontend: [
      {
        id: '1',
        title: 'Sprint 15 Velocity Drop',
        description: 'Predicted 15% decrease in velocity due to team member vacation',
        confidence: 85,
        impact: 'high' as const,
        category: 'sprint' as const,
        teamId: 'frontend',
        predictedDate: '2024-02-15',
        recommendations: ['Plan for reduced capacity', 'Prioritize critical features', 'Consider pair programming']
      },
      {
        id: '4',
        title: 'Code Quality Improvement',
        description: 'Predicted improvement in code quality metrics',
        confidence: 78,
        impact: 'medium' as const,
        category: 'performance' as const,
        teamId: 'frontend',
        predictedDate: '2024-02-25',
        recommendations: ['Continue code reviews', 'Maintain testing standards', 'Document best practices']
      }
    ],
    backend: [
      {
        id: '2',
        title: 'Deployment Risk Increase',
        description: 'Higher risk of deployment failures in next 2 weeks',
        confidence: 72,
        impact: 'medium' as const,
        category: 'risk' as const,
        teamId: 'backend',
        predictedDate: '2024-02-10',
        recommendations: ['Increase testing coverage', 'Add deployment safeguards', 'Review recent changes']
      },
      {
        id: '5',
        title: 'Database Performance Issue',
        description: 'Predicted database performance degradation',
        confidence: 65,
        impact: 'high' as const,
        category: 'risk' as const,
        teamId: 'backend',
        predictedDate: '2024-02-18',
        recommendations: ['Optimize queries', 'Add database monitoring', 'Consider scaling']
      }
    ],
    mobile: [
      {
        id: '3',
        title: 'Performance Optimization Opportunity',
        description: 'Identified potential for 20% performance improvement',
        confidence: 68,
        impact: 'medium' as const,
        category: 'opportunity' as const,
        teamId: 'mobile',
        predictedDate: '2024-02-20',
        recommendations: ['Refactor critical components', 'Implement caching strategy', 'Optimize database queries']
      }
    ],
    qa: [
      {
        id: '6',
        title: 'Test Coverage Improvement',
        description: 'Predicted improvement in test coverage and quality',
        confidence: 82,
        impact: 'medium' as const,
        category: 'performance' as const,
        teamId: 'qa',
        predictedDate: '2024-02-22',
        recommendations: ['Add integration tests', 'Improve test automation', 'Review test strategies']
      }
    ]
  }

  return basePredictions[teamId as keyof typeof basePredictions] || []
}

const getSprintPredictions = (teamId: string): SprintPrediction[] => {
  const baseSprintPredictions = {
    all: [
      {
        teamId: 'frontend',
        sprintNumber: 15,
        predictedVelocity: 85,
        confidence: 78,
        riskFactors: ['Team member vacation', 'Complex feature requirements'],
        recommendations: ['Reduce sprint scope', 'Increase pair programming']
      },
      {
        teamId: 'backend',
        sprintNumber: 12,
        predictedVelocity: 92,
        confidence: 85,
        riskFactors: ['New team member onboarding'],
        recommendations: ['Provide mentorship', 'Pair programming sessions']
      }
    ],
    frontend: [
      {
        teamId: 'frontend',
        sprintNumber: 15,
        predictedVelocity: 85,
        confidence: 78,
        riskFactors: ['Team member vacation', 'Complex feature requirements'],
        recommendations: ['Reduce sprint scope', 'Increase pair programming']
      }
    ],
    backend: [
      {
        teamId: 'backend',
        sprintNumber: 12,
        predictedVelocity: 92,
        confidence: 85,
        riskFactors: ['New team member onboarding'],
        recommendations: ['Provide mentorship', 'Pair programming sessions']
      }
    ],
    mobile: [
      {
        teamId: 'mobile',
        sprintNumber: 8,
        predictedVelocity: 88,
        confidence: 82,
        riskFactors: ['Platform-specific challenges'],
        recommendations: ['Allocate more time for testing', 'Cross-platform testing']
      }
    ],
    qa: [
      {
        teamId: 'qa',
        sprintNumber: 10,
        predictedVelocity: 90,
        confidence: 88,
        riskFactors: ['New testing tools'],
        recommendations: ['Training sessions', 'Gradual tool adoption']
      }
    ]
  }

  return baseSprintPredictions[teamId as keyof typeof baseSprintPredictions] || []
}

const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
  switch (impact) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200'
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200'
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'sprint':
      return <Calendar className="h-4 w-4" />
    case 'performance':
      return <Activity className="h-4 w-4" />
    case 'risk':
      return <AlertTriangle className="h-4 w-4" />
    case 'opportunity':
      return <TrendingUp className="h-4 w-4" />
    default:
      return <Target className="h-4 w-4" />
  }
}

export default function PredictionsPage() {
  const [selectedTeam, setSelectedTeam] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d')

  const currentTeam = teams.find(team => team.id === selectedTeam) || teams[0]
  const predictions = getPredictions(selectedTeam)
  const sprintPredictions = getSprintPredictions(selectedTeam)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Predictions</h1>
          <p className="text-muted-foreground">
            AI-powered insights and predictions for your engineering teams.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Next 7 days</SelectItem>
              <SelectItem value="30d">Next 30 days</SelectItem>
              <SelectItem value="90d">Next 90 days</SelectItem>
              <SelectItem value="1y">Next year</SelectItem>
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

      {/* AI Insights Overview */}
      <Alert>
        <Brain className="h-4 w-4" />
        <AlertDescription>
          AI has analyzed {currentTeam.name}'s performance patterns and identified {predictions.length} key predictions with {sprintPredictions.length} sprint insights.
        </AlertDescription>
      </Alert>

      {/* Key Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {predictions.map((prediction) => (
          <Card key={prediction.id} className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {getCategoryIcon(prediction.category)}
                  {prediction.title}
                </CardTitle>
                <Badge className={getImpactColor(prediction.impact)}>
                  {prediction.impact} impact
                </Badge>
              </div>
              <CardDescription>{prediction.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-medium">{prediction.confidence}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Predicted Date</span>
                <span className="font-medium">{prediction.predictedDate}</span>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Recommendations:</p>
                <ul className="space-y-1">
                  {prediction.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sprint Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Sprint Predictions
          </CardTitle>
          <CardDescription>
            AI-powered sprint velocity and risk predictions for upcoming sprints.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sprintPredictions.map((sprint, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Sprint {sprint.sprintNumber}</h3>
                    <p className="text-sm text-muted-foreground">
                      {teams.find(t => t.id === sprint.teamId)?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{sprint.predictedVelocity}%</p>
                    <p className="text-sm text-muted-foreground">Predicted Velocity</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Risk Factors:</p>
                    <ul className="space-y-1">
                      {sprint.riskFactors.map((risk, riskIndex) => (
                        <li key={riskIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-600" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Recommendations:</p>
                    <ul className="space-y-1">
                      {sprint.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence Level</span>
                    <span className="font-medium">{sprint.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analytics */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Prediction Trends</TabsTrigger>
          <TabsTrigger value="accuracy">Model Accuracy</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Prediction Accuracy Trend</CardTitle>
                <CardDescription>Historical accuracy of AI predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Prediction accuracy chart would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Prediction Distribution</CardTitle>
                <CardDescription>Distribution of predicted risks by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Risk distribution chart would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accuracy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance Metrics</CardTitle>
              <CardDescription>Accuracy and performance of AI prediction models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">87%</div>
                  <p className="text-sm text-muted-foreground">Overall Accuracy</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">92%</div>
                  <p className="text-sm text-muted-foreground">Sprint Predictions</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">78%</div>
                  <p className="text-sm text-muted-foreground">Risk Predictions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Key patterns and recommendations from AI analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Team Velocity Patterns</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    AI has identified that team velocity typically drops by 15-20% during the third week of each sprint.
                  </p>
                  <Badge variant="secondary">Pattern Detected</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Deployment Risk Factors</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Deployments on Fridays have 3x higher failure rates. Consider scheduling deployments earlier in the week.
                  </p>
                  <Badge variant="secondary">Recommendation</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Code Quality Correlation</h4>
                                     <p className="text-sm text-muted-foreground mb-2">
                     Teams with &gt;80% code review coverage show 40% fewer production issues.
                   </p>
                  <Badge variant="secondary">Insight</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 