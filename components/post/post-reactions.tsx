'use client'

import { ReactionSummary, ReactionType, REACTION_EMOJI } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

interface PostReactionsProps {
  postId: string
  reactions: ReactionSummary[]
  myReaction?: ReactionType | null
}

export function PostReactions({ postId, reactions, myReaction: initialMyReaction }: PostReactionsProps) {
  const [localReactions, setLocalReactions] = useState<ReactionSummary[]>(reactions)
  const [myReaction, setMyReaction] = useState<ReactionType | null>(initialMyReaction ?? null)
  const [loading, setLoading] = useState(false)

  async function handleReact(type: ReactionType) {
    if (loading) return
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const isSame = myReaction === type

    setLocalReactions((prev) => {
      const next = prev.map((r) => {
        if (r.reaction_type === type) return { ...r, count: isSame ? r.count - 1 : r.count + 1, reacted_by_me: !isSame }
        if (r.reaction_type === myReaction) return { ...r, count: r.count - 1, reacted_by_me: false }
        return r
      })
      return next.filter((r) => r.count > 0)
    })
    setMyReaction(isSame ? null : type)

    await fetch(`/api/posts/${postId}/reactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reaction_type: isSame ? null : type }),
    })

    setLoading(false)
  }

  const allTypes = Object.keys(REACTION_EMOJI) as ReactionType[]
  const summary = new Map(localReactions.map((r) => [r.reaction_type, r]))

  return (
    <div className="flex flex-wrap gap-1.5">
      {allTypes.map((type) => {
        const r = summary.get(type)
        const active = myReaction === type
        return (
          <button
            key={type}
            onClick={() => handleReact(type)}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              active
                ? 'bg-[#CDBBFF] text-[#2F2B3A] shadow-sm scale-105'
                : 'bg-[#F5F3FF] text-[#6B647A] hover:bg-[#EDE8FF]'
            }`}
          >
            <span>{REACTION_EMOJI[type].emoji}</span>
            {r && r.count > 0 && <span>{r.count}</span>}
          </button>
        )
      })}
    </div>
  )
}
