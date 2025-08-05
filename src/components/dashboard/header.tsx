"use client"

import { UserButton } from '@clerk/nextjs'
import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search metrics, teams, projects..."
            className="pl-10 w-80"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonPopoverActionButton: "text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50",
              userButtonPopoverActionButtonText: "text-sm font-medium text-gray-700 hover:text-gray-900",
            }
          }}
        />
      </div>
    </header>
  )
} 