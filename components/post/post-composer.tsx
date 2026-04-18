'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const PLACEHOLDERS = [
  '지금 생각나는 걸 써봐',
  '굳이 잘 쓰지 않아도 돼',
  '한 줄이면 충분해',
  '오늘 기억하고 싶은 것',
  '아무 말 대잔치 환영',
]

interface PostComposerProps {
  onSuccess?: () => void
  compact?: boolean
}

export function PostComposer({ onSuccess, compact = false }: PostComposerProps) {
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

    setLoading(false)
    if (res.ok) {
      setContent('')
      onSuccess?.()
      router.refresh()
    }
  }

  return (
    <div className={`flex flex-col gap-2 ${compact ? '' : 'bg-white rounded-3xl p-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)]'}`}>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, limit))}
        placeholder={placeholder}
        rows={compact ? 2 : 3}
      />
      <div className="flex items-center justify-between">
        <span className={`text-xs ${content.length > limit * 0.9 ? 'text-red-400' : 'text-[#B0AABF]'}`}>
          {content.length}/{limit}
        </span>
        <Button size="sm" onClick={handleSubmit} disabled={!content.trim() || loading}>
          {loading ? '올리는 중...' : '올리기'}
        </Button>
      </div>
    </div>
  )
}
