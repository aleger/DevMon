"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CreditCard, CheckCircle, Download, Eye } from 'lucide-react'

export default function BillingSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaved(true)
    setIsLoading(false)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <>
      {saved && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Billing information updated successfully!
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>
            Manage your subscription and billing details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="font-medium">Current Plan</div>
              <div className="text-sm text-muted-foreground">Pro Plan</div>
            </div>
            <Badge variant="default">$29/month</Badge>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Method</label>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">•••• •••• •••• 4242</span>
              <Badge variant="outline" className="ml-auto">Default</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Billing Address</label>
            <div className="p-3 border rounded-lg text-sm">
              <div>John Doe</div>
              <div>123 Main Street</div>
              <div>New York, NY 10001</div>
              <div>United States</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Next Invoice</label>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="text-sm font-medium">Pro Plan - Monthly</div>
                <div className="text-sm text-muted-foreground">Due on March 15, 2024</div>
              </div>
              <div className="text-sm font-medium">$29.00</div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              <Eye className="mr-2 h-4 w-4" />
              View Invoices
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Receipts
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              Update Payment Method
            </Button>
            <Button variant="outline" className="flex-1">
              Change Plan
            </Button>
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
              <CheckCircle className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </>
  )
} 