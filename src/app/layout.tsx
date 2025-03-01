import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import { ThemeProvider } from '@/common/lib/providers/theme'

import { Toaster } from '@/ui/sonner'

import { NavBar } from '@/common/components/layout/nav-bar'
import { Footer } from '@/common/components/layout/footer'

import '@/common/styles/globals.css'
import { QueryProvider } from '@/common/lib/providers/query'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'La Casa de mi Padre',
  description: 'La Casa de mi Padre - Donde todos tienen un lugar'
}

export default function RootLayout ({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={`${inter.className} relative`}>
        <QueryProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='ligth'
            disableTransitionOnChange
          >
            <NavBar />

            <main>
              {children}
            </main>

            <Toaster />
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
