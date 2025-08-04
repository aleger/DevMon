"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Bell, 
  GitBranch, 
  CreditCard
} from 'lucide-react'

const settingsTabs = [
  { name: 'Account', href: '/dashboard/settings/security', icon: User },
  { name: 'Notifications', href: '/dashboard/settings/notifications', icon: Bell },
  { name: 'Integrations', href: '/dashboard/settings/integrations', icon: GitBranch },
  { name: 'Billing', href: '/dashboard/settings/billing', icon: CreditCard },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs value={pathname} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          {settingsTabs.map((tab) => (
            <TabsTrigger
              key={tab.href}
              value={tab.href}
              asChild
              className="flex items-center gap-2"
            >
              <Link href={tab.href}>
                <tab.icon className="h-4 w-4" />
                {tab.name}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {children}
    </div>
  )
} 