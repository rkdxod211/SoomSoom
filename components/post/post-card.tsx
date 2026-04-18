import Link from 'next/link'
import { Post, ReactionType } from '@/types'
import { Card } from '@/components/ui/card'
import { CharacterBadge } from '@/components/character/character-badge'
import { PostReactions } from './post-reactions'
import { relativeTime } from '@/lib/utils/date'
import { MessageCircle } from 'lucide-react'

interface PostCardProps {
  post: Post
  myReaction?: ReactionType | null
  showReplies?: boolean
}

export function PostCard({ post, myReaction, showReplies = true }: PostCardProps) {
  if (!post.author) return null

  return (
    <Card className="p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Link href={`/character/${post.user_id}`}>
          <CharacterBadge
            type={post.author.character_type}
            color={post.author.character_color}
            name={post.author.character_name}
            size="sm"
          />
        </Link>
        <span className="text-xs text-[#B0AABF]">{relativeTime(post.created_at)}</span>
      </div>

      <Link href={`/post/${post.id}`}>
        <p className="text-sm text-[#2F2B3A] leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </Link>

      <div className="flex items-center justify-between">
        <PostReactions
          postId={post.id}
          reactions={post.reactions ?? []}
          myReaction={myReaction}
        />
        {showReplies && (
          <Link href={`/post/${post.id}`} className="flex items-center gap-1 text-xs text-[#B0AABF] hover:text-[#9B8FC4]">
            <MessageCircle size={13} />
            <span>{post.reply_count ?? 0}</span>
          </Link>
        )}
      </div>
    </Card>
  )
}
