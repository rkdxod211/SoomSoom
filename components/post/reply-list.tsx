import Link from 'next/link'
import { Reply } from '@/types'
import { CharacterBadge } from '@/components/character/character-badge'
import { relativeTime } from '@/lib/utils/date'

interface ReplyListProps {
  replies: Reply[]
}

export function ReplyList({ replies }: ReplyListProps) {
  if (replies.length === 0) {
    return <p className="text-sm text-[#B0AABF] text-center py-4">아직 답글이 없어요</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {replies.map((reply) => (
        <div key={reply.id} className="flex flex-col gap-1.5 pl-4 border-l-2 border-[#F0EDFF]">
          <div className="flex items-center justify-between">
            {reply.author && (
              <Link href={`/character/${reply.user_id}`}>
                <CharacterBadge
                  type={reply.author.character_type}
                  color={reply.author.character_color}
                  name={reply.author.character_name}
                  size="sm"
                />
              </Link>
            )}
            <span className="text-xs text-[#B0AABF]">{relativeTime(reply.created_at)}</span>
          </div>
          <p className="text-sm text-[#2F2B3A] leading-relaxed">{reply.content}</p>
        </div>
      ))}
    </div>
  )
}
