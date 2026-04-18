'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'pill'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClass: Record<Variant, string> = {
  primary: 'bg-[#CDBBFF] text-[#2F2B3A] hover:bg-[#b9a3ff] font-semibold shadow-sm',
  secondary: 'bg-[#F0EDFF] text-[#2F2B3A] hover:bg-[#e2dcff] font-medium',
  ghost: 'bg-transparent text-[#2F2B3A] hover:bg-[#F0EDFF]',
  pill: 'bg-[#CDBBFF] text-[#2F2B3A] hover:bg-[#b9a3ff] font-semibold rounded-full shadow-sm',
}

const sizeClass: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-6 py-3',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-2xl transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClass[variant]} ${sizeClass[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
