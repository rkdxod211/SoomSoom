import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '숨숨 — 정체는 숨기고, 캐릭터로만 솔직해지는 SNS',
  description: '랜덤 캐릭터로만 짧은 글을 올리는 캐릭터 기반 익명 SNS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  )
}
