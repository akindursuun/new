import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Akin Web Builder',
  description: 'Görsel web sitesi oluşturucu'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
