import Link from 'next/link'
import { Post } from '@/types'
import { Card } from '@/components/ui/card'
import { CharacterBadge } from '@/components/character/character-badge'
import { BookmarkButton } from './bookmark-button'
import { relativeTime } from '@/lib/utils/date'
import { MessageCircle } from 'lucide-react'

interface PostCardProps {
  post: Post
  showReplies?: boolean
}

export function PostCard({ post, showReplies = true }: PostCardProps) {
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
        {showReplies && (
          <div className="flex items-center gap-3">
            <Link href={`/post/${post.id}`} className="flex items-center gap-1 text-xs text-[#B0AABF] hover:text-[#9B8FC4]">
              <MessageCircle size={13} />
              <span>{post.reply_count ?? 0}</span>
            </Link>
            {post.bookmark_count !== undefined && (
              <span className="flex items-center gap-1 text-xs text-[#B0AABF]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z"/></svg>
                {post.bookmark_count}
              </span>
            )}
          </div>
        )}
        <div className="ml-auto">
          <BookmarkButton postId={post.id} initialBookmarked={post.is_bookmarked ?? false} />
        </div>
      </div>
    </Card>
  )
}
