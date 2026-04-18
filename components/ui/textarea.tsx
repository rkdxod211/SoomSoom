'use client'

import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full rounded-2xl border border-[#E8E4FF] bg-[#FAFAFE] px-4 py-3 text-sm text-[#2F2B3A] placeholder:text-[#B0AABF] focus:outline-none focus:ring-2 focus:ring-[#CDBBFF] resize-none transition ${className}`}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'
