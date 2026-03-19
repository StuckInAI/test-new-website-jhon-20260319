import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js Landing Page - Modern & Responsive',
  description: 'A modern landing page built with Next.js, TypeScript, Tailwind CSS, and SQLite database.',
  keywords: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Landing Page', 'SQLite'],
  authors: [{ name: 'Your Company' }],
  openGraph: {
    type: 'website',
    title: 'Next.js Landing Page',
    description: 'A modern landing page built with Next.js and TypeScript',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {children}
      </body>
    </html>
  )
}