"use client"

import { Card, CardContent } from '@/components/ui/card'

export function MetricsOverview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Lead Time</div>
            <div className="text-2xl font-bold">2.3 days</div>
            <div className="text-xs text-green-600">↓ 12% from last week</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Deployment Frequency</div>
            <div className="text-2xl font-bold">3.2/day</div>
            <div className="text-xs text-green-600">↑ 8% from last week</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">PR Cycle Time</div>
            <div className="text-2xl font-bold">1.8 days</div>
            <div className="text-xs text-green-600">↓ 5% from last week</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Metrics Chart</div>
          <div className="text-sm text-muted-foreground">
            Chart visualization will be implemented with Recharts
          </div>
        </div>
      </div>
    </div>
  )
} 