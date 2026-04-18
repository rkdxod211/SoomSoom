'use client'

import { useState } from 'react'
import { Bookmark } from 'lucide-react'

interface BookmarkButtonProps {
  postId: string
  initialBookmarked: boolean
}

export function BookmarkButton({ postId, initialBookmarked }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    if (loading) return
    setLoading(true)
    const method = bookmarked ? 'DELETE' : 'POST'
    const res = await fetch(`/api/bookmarks/${postId}`, { method })
    if (res.ok) setBookmarked(!bookmarked)
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all cursor-pointer ${
        bookmarked
          ? 'text-[#7C5CFC] bg-[#F0EDFF]'
          : 'text-[#B0AABF] hover:text-[#7C5CFC] hover:bg-[#F0EDFF]'
      }`}
    >
      <Bookmark size={13} fill={bookmarked ? '#7C5CFC' : 'none'} />
    </button>
  )
}
