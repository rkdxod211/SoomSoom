'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface FollowButtonProps {
  userId: string
  initialFollowing: boolean
}

export function FollowButton({ userId, initialFollowing }: FollowButtonProps) {
  const [following, setFollowing] = useState(initialFollowing)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    if (loading) return
    setLoading(true)
    const method = following ? 'DELETE' : 'POST'
    const res = await fetch(`/api/follows/${userId}`, { method })
    if (res.ok) setFollowing(!following)
    setLoading(false)
  }

  return (
    <Button
      variant={following ? 'secondary' : 'primary'}
      size="sm"
      onClick={toggle}
      disabled={loading}
    >
      {following ? '팔로잉' : '팔로우'}
    </Button>
  )
}
