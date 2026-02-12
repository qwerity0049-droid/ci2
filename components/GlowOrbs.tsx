'use client'

import { useEffect, useRef, useState } from 'react'

export default function GlowOrbs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const rafRef = useRef<number | null>(null)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        
        // Используем requestAnimationFrame для оптимизации
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current)
        }
        
        rafRef.current = requestAnimationFrame(() => {
          setMousePos({ x, y })
        })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])
  
  // Убраны blur эффекты для производительности - только градиенты, уменьшено количество
  const orbs = [
    { size: 180, baseX: 0.2, baseY: 0.3, opacity: 0.02, speed: 0.02 },
  ]
  
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#050505' }}
    >
      {orbs.map((orb, index) => {
        const x = (orb.baseX + (mousePos.x - 0.5) * orb.speed) * 100
        const y = (orb.baseY + (mousePos.y - 0.5) * orb.speed) * 100
        
        return (
          <div
            key={index}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${x}%`,
              top: `${y}%`,
              opacity: orb.opacity,
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent 70%)',
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.3s ease-out, top 0.3s ease-out',
            }}
          />
        )
      })}
    </div>
  )
}
