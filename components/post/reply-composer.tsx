'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface ReplyComposerProps {
  postId: string
}

export function ReplyComposer({ postId }: ReplyComposerProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const limit = 80

  async function handleSubmit() {
    if (!content.trim() || loading) return
    setLoading(true)

    await fetch(`/api/posts/${postId}/replies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content.trim() }),
    })

    setLoading(false)
    setContent('')
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, limit))}
        placeholder="짧게 답글 남기기"
        rows={2}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#B0AABF]">{content.length}/{limit}</span>
        <Button size="sm" onClick={handleSubmit} disabled={!content.trim() || loading}>
          {loading ? '...' : '답글'}
        </Button>
      </div>
    </div>
  )
}
