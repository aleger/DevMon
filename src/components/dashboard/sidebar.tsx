"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Settings,
  Users,
  GitBranch,
  TrendingUp,
  AlertTriangle,
  Zap,
  Home
} from 'lucide-react'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Metrics', href: '/dashboard/metrics', icon: BarChart3 },
  { name: 'Predictions', href: '/dashboard/predictions', icon: TrendingUp },
  { name: 'Integrations', href: '/dashboard/integrations', icon: GitBranch },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Alerts', href: '/dashboard/alerts', icon: AlertTriangle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">DevMon</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI Insights</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Get personalized recommendations
          </p>
        </div>
      </div>
    </div>
  )
} 