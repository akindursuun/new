import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: { default: 'NOVA Holding', template: '%s | NOVA Holding' },
  description: 'Uzun vadeli değer yaratan, çok sektörlü yatırım ve yönetim grubu.'
}
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="tr"><body>{children}</body></html>
}
