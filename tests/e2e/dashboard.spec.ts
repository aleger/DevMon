import { test, expect } from '@playwright/test'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication for testing
    await page.addInitScript(() => {
      window.localStorage.setItem('clerk-db', JSON.stringify({
        lastActiveTokenId: 'test-token',
        sessions: [{
          id: 'test-session',
          userId: 'test-user',
          status: 'active'
        }]
      }))
    })
  })

  test('should display dashboard overview', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Check if main dashboard elements are present
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
    await expect(page.getByText('Welcome back!')).toBeVisible()
    
    // Check if metric cards are displayed
    await expect(page.getByText('Lead Time')).toBeVisible()
    await expect(page.getByText('Deployment Frequency')).toBeVisible()
    await expect(page.getByText('PR Cycle Time')).toBeVisible()
    await expect(page.getByText('Team Velocity')).toBeVisible()
  })

  test('should show system health status', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Check system health section
    await expect(page.getByText('System Health')).toBeVisible()
    await expect(page.getByText('Azure DevOps')).toBeVisible()
    await expect(page.getByText('Jira')).toBeVisible()
    await expect(page.getByText('Data Sync')).toBeVisible()
  })

  test('should display active alerts', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Check alerts section
    await expect(page.getByText('Active Alerts')).toBeVisible()
    await expect(page.getByText('Sprint Risk')).toBeVisible()
    await expect(page.getByText('Code Review')).toBeVisible()
    await expect(page.getByText('Deployment')).toBeVisible()
  })

  test('should show metrics overview chart', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Check metrics overview section
    await expect(page.getByText('Metrics Overview')).toBeVisible()
    await expect(page.getByText('Key performance indicators over the last 30 days')).toBeVisible()
  })

  test('should display AI predictions', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Check AI predictions section
    await expect(page.getByText('AI Predictions')).toBeVisible()
    await expect(page.getByText('AI-generated insights and recommendations')).toBeVisible()
  })

  test('should show recent activity', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Check recent activity section
    await expect(page.getByText('Recent Activity')).toBeVisible()
    await expect(page.getByText('Latest updates from your integrations')).toBeVisible()
  })

  test('should have working navigation sidebar', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Check sidebar navigation items
    await expect(page.getByText('Overview')).toBeVisible()
    await expect(page.getByText('Metrics')).toBeVisible()
    await expect(page.getByText('Predictions')).toBeVisible()
    await expect(page.getByText('Integrations')).toBeVisible()
    await expect(page.getByText('Team')).toBeVisible()
    await expect(page.getByText('Alerts')).toBeVisible()
    await expect(page.getByText('Settings')).toBeVisible()
  })

  test('should have search functionality', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Check search input
    const searchInput = page.getByPlaceholder('Search metrics, teams, projects...')
    await expect(searchInput).toBeVisible()
    
    // Test search functionality
    await searchInput.fill('lead time')
    await expect(searchInput).toHaveValue('lead time')
  })
}) 