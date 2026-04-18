'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const PLACEHOLDERS = [
  '지금 생각나는 걸 써봐',
  '굳이 잘 쓰지 않아도 돼',
  '한 줄이면 충분해',
  '오늘 기억하고 싶은 것',
  '아무 말 대잔치 환영',
]

export default function WritePage() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0])
  const router = useRouter()

  useEffect(() => {
    setPlaceholder(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)])
  }, [])
  const limit = 120

  async function handleSubmit() {
    if (!content.trim() || loading) return
    setLoading(true)

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content.trim() }),
    })

    if (res.ok) {
      router.push('/feed')
      router.refresh()
    } else {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFDF8' }}>
      <header className="sticky top-0 z-50 bg-[#FFFDF8]/90 backdrop-blur-sm border-b border-[#F0EDFF]">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => router.back()} className="text-[#6B647A] hover:text-[#2F2B3A] cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-base font-semibold text-[#2F2B3A]">글 쓰기</h1>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-6 pb-8 flex flex-col gap-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, limit))}
          placeholder={placeholder}
          rows={6}
          autoFocus
        />

        <div className="flex items-center justify-between">
          <span className={`text-sm ${content.length > limit * 0.9 ? 'text-red-400' : 'text-[#B0AABF]'}`}>
            {content.length} / {limit}
          </span>
          <Button onClick={handleSubmit} disabled={!content.trim() || loading} size="md">
            {loading ? '올리는 중...' : '올리기'}
          </Button>
        </div>

        <p className="text-xs text-[#B0AABF]">
          잘 쓰지 않아도 괜찮아. 그냥 지금 생각나는 거 쓰면 돼.
        </p>
      </main>
    </div>
  )
}
