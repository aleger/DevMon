"use client"

import { Badge } from '@/components/ui/badge'
import { AlertTriangle, TrendingUp, Clock, Users } from 'lucide-react'

export function PredictionsPanel() {
  const predictions = [
    {
      id: 1,
      type: 'Sprint Risk',
      title: 'High risk of sprint spillover',
      description: 'Based on current velocity, team is likely to miss 3 story points',
      confidence: 85,
      severity: 'high',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      id: 2,
      type: 'Team Health',
      title: 'Code review time improving',
      description: 'Average review time decreased by 15% this week',
      confidence: 92,
      severity: 'positive',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'Capacity',
      title: 'Team capacity optimal',
      description: 'Current workload is well-balanced across team members',
      confidence: 78,
      severity: 'normal',
      icon: Users,
      color: 'text-blue-600'
    }
  ]

  return (
    <div className="space-y-4">
      {predictions.map((prediction) => {
        const Icon = prediction.icon
        return (
          <div key={prediction.id} className="flex items-start space-x-3 p-3 rounded-lg border">
            <Icon className={`h-5 w-5 mt-0.5 ${prediction.color}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium">{prediction.title}</h4>
                <Badge 
                  variant={prediction.severity === 'high' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {prediction.confidence}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {prediction.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {prediction.type}
                </span>
                <span className="text-xs text-muted-foreground">
                  AI Generated
                </span>
              </div>
            </div>
          </div>
        )
      })}
      
      <div className="text-center pt-4">
        <button className="text-sm text-primary hover:underline">
          View all predictions →
        </button>
      </div>
    </div>
  )
} 