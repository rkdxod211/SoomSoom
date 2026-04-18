import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-white/60 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
