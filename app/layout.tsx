import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['cyrillic', 'latin'],
  variable: '--font-cormorant',
  display: 'swap',
  fallback: ['serif'],
})

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Staltehnoservis',
  description: 'Ваш дом начинается с тишины',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${cormorant.variable} ${inter.variable} font-inter antialiased`}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
