'use client'

import { useEffect, ReactNode, useRef, createContext, useContext } from 'react'
import Lenis from '@studio-freight/lenis'
import { usePathname } from 'next/navigation'

interface LenisContextType {
  lenis: Lenis | null
}

const LenisContext = createContext<LenisContextType>({ lenis: null })

export const useLenis = () => useContext(LenisContext)

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    // Инициализация Lenis с оптимизированными настройками для производительности (особенно Яндекс браузер)
    const lenis = new Lenis({
      duration: 1.2, // Длительность анимации скролла
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing функция для плавности (ease-out-expo)
      orientation: 'vertical', // Вертикальный скролл
      gestureOrientation: 'vertical',
      smoothWheel: true, // Плавный скролл колесиком мыши
      wheelMultiplier: 1.5, // Увеличенный множитель для более агрессивного скролла (один скролл = один этап)
      syncTouch: true, // Синхронизация касаний для устранения рывков на мобильных
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.15, // Немного увеличенный lerp для лучшей производительности в Яндекс браузере
    })

    lenisRef.current = lenis

    // Сохраняем экземпляр в window для доступа из других компонентов
    if (typeof window !== 'undefined') {
      ;(window as any).lenis = lenis
    }

    // Интеграция с framer-motion для синхронизации скролла (throttled для производительности)
    let scrollTimeout: NodeJS.Timeout | null = null
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }: any) => {
      // Throttle события скролла для лучшей производительности
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      scrollTimeout = setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('lenis-scroll', { detail: { scroll, limit, velocity, direction, progress } }))
        }
      }, 16) // ~60fps
    })

    // Оптимизированная функция для обновления анимации
    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    function raf(time: number) {
      const elapsed = time - lastTime
      
      if (elapsed >= frameInterval) {
        lenis.raf(time)
        lastTime = time - (elapsed % frameInterval)
      }
      
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    // Плавный скролл к началу при смене страницы
    if (pathname) {
      lenis.scrollTo(0, { immediate: true })
    }

    // Очистка при размонтировании
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      lenis.destroy()
      lenisRef.current = null
      if (typeof window !== 'undefined') {
        delete (window as any).lenis
      }
    }
  }, [pathname])

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  )
}
