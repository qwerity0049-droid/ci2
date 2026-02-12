'use client'

import { useState } from 'react'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href="/"
      className={`inline-flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Текст логотипа - STALTEHNO с золотым градиентом */}
      <span
        className="font-serif uppercase tracking-[0.4em] text-xl font-bold bg-gradient-to-r from-[#C5A35D] via-[#F0D080] to-[#C5A35D] bg-clip-text text-transparent transition-all duration-300"
        style={{
          fontFamily: 'var(--font-cormorant), serif',
        }}
      >
        STALTEHNO
      </span>
    </a>
  )
}
