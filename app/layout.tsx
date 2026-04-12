import type { Metadata } from 'next'
import { Lora, Inter } from 'next/font/google'
import './globals.css'

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TUTKÜN — Norwalk Island Sharpie 26 à vendre',
  description:
    'Voilier Norwalk Island Sharpie 26, conçu par Bruce Kirby. Construction bois/époxy 2010–2018. 29 900 $ CAD. Évalué 65 700 $.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${lora.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-cream text-gray-800 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
