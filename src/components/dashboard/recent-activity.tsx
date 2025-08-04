"use client"

import { GitBranch, GitPullRequest, GitCommit, AlertCircle } from 'lucide-react'

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'pr_merged',
      title: 'PR #1234 merged',
      description: 'Feature: Add user authentication module',
      author: 'Sarah Chen',
      time: '2 hours ago',
      icon: GitPullRequest,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'deployment',
      title: 'Deployment successful',
      description: 'v1.2.3 deployed to production',
      author: 'CI/CD Pipeline',
      time: '4 hours ago',
      icon: GitBranch,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'commit',
      title: 'New commit pushed',
      description: 'Fix: Resolve authentication bug',
      author: 'Mike Johnson',
      time: '6 hours ago',
      icon: GitCommit,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Build failed',
      description: 'Unit tests failing in main branch',
      author: 'CI/CD Pipeline',
      time: '8 hours ago',
      icon: AlertCircle,
      color: 'text-red-600'
    },
    {
      id: 5,
      type: 'pr_created',
      title: 'PR #1235 created',
      description: 'Feature: Implement dashboard analytics',
      author: 'Alex Rodriguez',
      time: '1 day ago',
      icon: GitPullRequest,
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = activity.icon
        return (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center`}>
              <Icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{activity.title}</h4>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">by {activity.author}</p>
            </div>
          </div>
        )
      })}
      
      <div className="text-center pt-4">
        <button className="text-sm text-primary hover:underline">
          View all activity →
        </button>
      </div>
    </div>
  )
} 