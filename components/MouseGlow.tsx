'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { motion, useTransform } from 'framer-motion'

export default function MouseGlow() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Используем useMotionValue для максимально быстрого отклика
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Используем useSpring с оптимизированными настройками для производительности
  const springConfig = { damping: 35, stiffness: 150 } // Еще больше уменьшена stiffness для производительности
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  
  // Трансформируем координаты для центрирования свечения
  const glowX = useTransform(x, (value) => value - 200)
  const glowY = useTransform(y, (value) => value - 200)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }
    }
    
    // Отслеживаем движение мыши по всей области Hero
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])
  
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[15] pointer-events-none"
    >
      <motion.div
        className="absolute w-[150px] h-[150px] rounded-full"
        style={{
          x: glowX,
          y: glowY,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent 70%)',
          opacity: 0.08,
          willChange: 'auto',
        }}
      />
    </div>
  )
}
