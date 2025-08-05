import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevMon - Developer Metrics & Analytics',
  description: 'AI-powered developer metrics and team analytics platform for engineering productivity',
  keywords: ['developer metrics', 'engineering analytics', 'team productivity', 'devops', 'agile'],
  authors: [{ name: 'DevMon Team' }],
  creator: 'DevMon',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmon.com',
    title: 'DevMon - Developer Metrics & Analytics',
    description: 'AI-powered developer metrics and team analytics platform for engineering productivity',
    siteName: 'DevMon',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevMon - Developer Metrics & Analytics',
    description: 'AI-powered developer metrics and team analytics platform for engineering productivity',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: '#3b82f6',
              colorBackground: '#ffffff',
              colorInputBackground: '#ffffff',
              colorInputText: '#000000',
            },
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
} 