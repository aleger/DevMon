import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

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

describe('ContactPage', () => {
  it('should render without errors', async () => {
    // Import and render the page component
    const ContactPage = (await import('../page')).default
    const { container } = render(<ContactPage />)
    
    // Check that the page renders without errors
    expect(container).toBeInTheDocument()
  })

  it('should display contact form and information', async () => {
    const ContactPage = (await import('../page')).default
    render(<ContactPage />)
    
    // Check for main sections
    expect(screen.getByText(/Contact Us/)).toBeInTheDocument()
    expect(screen.getByText(/Send us a Message/)).toBeInTheDocument()
    expect(screen.getByText(/Contact Information/)).toBeInTheDocument()
    expect(screen.getByText(/Response Times/)).toBeInTheDocument()
  })

  it('should have form fields', async () => {
    const ContactPage = (await import('../page')).default
    render(<ContactPage />)
    
    // Check for form fields
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Company/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Subject/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Message/)).toBeInTheDocument()
    expect(screen.getByText(/Category/)).toBeInTheDocument()
    expect(screen.getAllByText(/Priority/).length).toBeGreaterThan(0)
  })

  it('should show validation errors for invalid input', async () => {
    const user = userEvent.setup()
    const ContactPage = (await import('../page')).default
    render(<ContactPage />)
    
    // Try to submit empty form
    const submitButton = screen.getByText(/Send Message/)
    await user.click(submitButton)
    
    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/Name must be at least 2 characters/)).toBeInTheDocument()
      expect(screen.getByText(/Please enter a valid email address/)).toBeInTheDocument()
    })
  })

  it('should handle form submission', async () => {
    const user = userEvent.setup()
    const ContactPage = (await import('../page')).default
    render(<ContactPage />)
    
    // Fill out the form
    await user.type(screen.getByLabelText(/Name/), 'John Doe')
    await user.type(screen.getByLabelText(/Email/), 'john@example.com')
    await user.type(screen.getByLabelText(/Subject/), 'Test inquiry')
    await user.type(screen.getByLabelText(/Message/), 'This is a test message with enough characters to pass validation.')
    
    // Submit the form
    const submitButton = screen.getByText(/Send Message/)
    await user.click(submitButton)
    
    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText(/Sending.../)).toBeInTheDocument()
    })
    
    // Should show success message after submission
    await waitFor(() => {
      expect(screen.getByText(/Thank you for your message/)).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('should display contact information', async () => {
    const ContactPage = (await import('../page')).default
    render(<ContactPage />)
    
    // Check for contact info
    expect(screen.getByText(/hello@devmon.com/)).toBeInTheDocument()
    expect(screen.getByText(/\+1 \(555\) 123-4567/)).toBeInTheDocument()
    expect(screen.getByText(/San Francisco, CA/)).toBeInTheDocument()
    expect(screen.getByText(/Mon-Fri 9AM-6PM PST/)).toBeInTheDocument()
  })

  it('should display response times', async () => {
    const ContactPage = (await import('../page')).default
    render(<ContactPage />)
    
    // Check for response time badges
    expect(screen.getAllByText(/High Priority/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Medium Priority/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Low Priority/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/2-4 hours/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/24 hours/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/48 hours/).length).toBeGreaterThan(0)
  })
})
