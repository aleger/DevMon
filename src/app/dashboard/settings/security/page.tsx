"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Shield, CheckCircle, Eye, EyeOff, Monitor, Smartphone, Tablet, X } from 'lucide-react'

interface Device {
  id: string
  name: string
  type: 'desktop' | 'mobile' | 'tablet'
  location: string
  lastActive: string
  isCurrent: boolean
  ipAddress: string
}

export default function SecuritySettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: true,
    loginNotifications: true,
  })

  // Mock device data
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'MacBook Pro',
      type: 'desktop',
      location: 'San Francisco, CA',
      lastActive: '2 minutes ago',
      isCurrent: true,
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      name: 'iPhone 15',
      type: 'mobile',
      location: 'San Francisco, CA',
      lastActive: '1 hour ago',
      isCurrent: false,
      ipAddress: '192.168.1.101'
    },
    {
      id: '3',
      name: 'iPad Pro',
      type: 'tablet',
      location: 'New York, NY',
      lastActive: '3 days ago',
      isCurrent: false,
      ipAddress: '10.0.0.50'
    },
    {
      id: '4',
      name: 'Windows PC',
      type: 'desktop',
      location: 'London, UK',
      lastActive: '1 week ago',
      isCurrent: false,
      ipAddress: '172.16.0.25'
    }
  ])

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaved(true)
    setIsLoading(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaved(true)
    setIsLoading(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleRevokeDevice = async (deviceId: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setDevices(prev => prev.filter(device => device.id !== deviceId))
    setSaved(true)
    setIsLoading(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'desktop':
        return <Monitor className="h-4 w-4" />
      case 'mobile':
        return <Smartphone className="h-4 w-4" />
      case 'tablet':
        return <Tablet className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <>
      {saved && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Security settings saved successfully!
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Change Password
          </CardTitle>
          <CardDescription>
            Update your account password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="text-sm font-medium">
                Current Password
              </label>
              <div className="relative">
                <Input 
                  id="currentPassword" 
                  name="currentPassword"
                  type={showPasswords ? "text" : "password"}
                  placeholder="Enter your current password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswords(!showPasswords)}
                >
                  {showPasswords ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium">
                New Password
              </label>
              <Input 
                id="newPassword" 
                name="newPassword"
                type={showPasswords ? "text" : "password"}
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm New Password
              </label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword"
                type={showPasswords ? "text" : "password"}
                placeholder="Confirm your new password"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Update Password
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Manage your account security and privacy settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </div>
            </div>
            <Switch 
              checked={settings.twoFactorAuth}
              onCheckedChange={() => handleToggle('twoFactorAuth')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Session Timeout</div>
              <div className="text-sm text-muted-foreground">
                Automatically log out after 30 minutes of inactivity
              </div>
            </div>
            <Switch 
              checked={settings.sessionTimeout}
              onCheckedChange={() => handleToggle('sessionTimeout')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Login Notifications</div>
              <div className="text-sm text-muted-foreground">
                Get notified when someone logs into your account
              </div>
            </div>
            <Switch 
              checked={settings.loginNotifications}
              onCheckedChange={() => handleToggle('loginNotifications')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device History</CardTitle>
          <CardDescription>
            Manage active sessions and devices. You can revoke access to any device except the current one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {devices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    {getDeviceIcon(device.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{device.name}</span>
                      {device.isCurrent && (
                        <Badge variant="secondary" className="text-xs">
                          Current Device
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {device.location} • {device.ipAddress}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last active: {device.lastActive}
                    </div>
                  </div>
                </div>
                {!device.isCurrent && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRevokeDevice(device.id)}
                    disabled={isLoading}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Saving...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </>
  )
} 