import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock Clerk auth
jest.mock('@clerk/nextjs', () => ({
  auth: jest.fn(() => Promise.resolve({ userId: null })),
  UserButton: jest.fn(() => <div>UserButton</div>)
}))

describe('FeaturesPage', () => {
  it('should render without errors', async () => {
    // Import and render the page component
    const FeaturesPage = (await import('../page')).default
    const { container } = render(await FeaturesPage())
    
    // Check that the page renders without errors
    expect(container).toBeInTheDocument()
  })

  it('should contain all expected sections', async () => {
    const FeaturesPage = (await import('../page')).default
    render(await FeaturesPage())
    
    // Check for main sections
    expect(screen.getByText(/AI-Powered Engineering Analytics/)).toBeInTheDocument()
    expect(screen.getByText(/Core Engineering Metrics/)).toBeInTheDocument()
    expect(screen.getByText(/AI-Powered Predictions/)).toBeInTheDocument()
    expect(screen.getByText(/Seamless Integrations/)).toBeInTheDocument()
    expect(screen.getByText(/Team Management/)).toBeInTheDocument()
    expect(screen.getByText(/Security & Compliance/)).toBeInTheDocument()
  })

  it('should have proper navigation links', async () => {
    const FeaturesPage = (await import('../page')).default
    render(await FeaturesPage())
    
    // Check for navigation links
    const signUpLinks = screen.getAllByRole('link', { name: /Get Started Free/ })
    const demoLinks = screen.getAllByRole('link', { name: /View Demo/ })
    
    expect(signUpLinks.length).toBeGreaterThan(0)
    expect(demoLinks.length).toBeGreaterThan(0)
  })
})
