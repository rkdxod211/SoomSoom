import type { Metadata, Viewport } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'soomsoom',
  description: '캐릭터로 숨어서 솔직하게',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'soomsoom',
  },
}

export const viewport: Viewport = {
  themeColor: '#7C6FCD',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">
        {children}
        <Script id="sw-register" strategy="afterInteractive">
          {`if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js') }`}
        </Script>
      </body>
    </html>
  )
}
