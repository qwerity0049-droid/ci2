'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'
import { ShieldCheck } from 'lucide-react'
import Lenis from '@studio-freight/lenis'

// Компонент для анимированных букв - оптимизированная версия
const AnimatedLetter = ({ letter, index, startDelay, isHighlight }: { letter: string; index: number; startDelay: number; isHighlight: boolean }) => {
  if (letter === ' ') {
    return <span className="inline-block w-2 md:w-3 lg:w-4" />
  }
  
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: startDelay + index * 0.02,
      }}
      style={{ willChange: 'auto' }}
    >
      {letter}
    </motion.span>
  )
}

export default function Hero() {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const checkLenis = () => {
      if (typeof window !== 'undefined') {
        const lenisInstance = (window as any).lenis
        if (lenisInstance) {
          setLenis(lenisInstance)
        } else {
          setTimeout(checkLenis, 100)
        }
      }
    }
    checkLenis()
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement && lenis) {
      lenis.scrollTo(targetElement, {
        offset: -80,
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const title = 'Искусство безупречного входа'
  // Мемоизируем разбиение строки для производительности
  const letters = useMemo(() => title.split(''), [])
  
  // Определяем индексы для слова "безупречного" (начинается с позиции 9)
  const highlightStartIndex = useMemo(() => title.indexOf('безупречного'), [])
  const highlightEndIndex = useMemo(() => highlightStartIndex + 'безупречного'.length, [highlightStartIndex])
  
  // Задержка для начала анимации заголовка (после плашки)
  const badgeAnimationDuration = 0.6
  const titleStartDelay = badgeAnimationDuration + 0.2

  // Используем прямую ссылку Pinterest с fallback на локальный файл
  const heroImageSrc = imageError 
    ? '/images/hero-door.jpg' 
    : 'https://i.pinimg.com/736x/21/53/7c/21537ca2586733246761005a761e05a7.jpg'

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-noir-bg pt-16 md:pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <Image
            src={heroImageSrc}
            alt="Architectural door"
            fill
            priority
            quality={75} // Уменьшено качество для лучшей производительности
            className="object-cover object-center md:object-[28%_center]"
            style={{
              objectPosition: 'center center', // На мобильных строго по центру
            }}
            onError={() => setImageError(true)}
            unoptimized={!imageError}
          />
        </div>
        {/* Dark overlay для читаемости текста */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Упрощенный градиент для плавного растворения в черный фон (объединены два слоя в один) */}
        <div 
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: 'radial-gradient(circle, transparent 30%, #050505 100%)',
          }}
        />
      </div>

      {/* Noise texture overlay - убран mix-blend для производительности */}
      <div 
        className="absolute inset-0 noise-bg z-[5]"
        aria-hidden="true"
        style={{
          opacity: 0.015, // Еще больше уменьшена непрозрачность
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 py-12 md:py-20 md:px-8 lg:px-16">
        {/* Badge "с 1998 • Москва" */}
        <motion.div
          className="inline-flex items-center px-4 py-2 mb-6 md:mb-8 rounded-full border border-white/30 bg-white/5"
          style={{
            boxShadow: '0 0 0 0.5px rgba(255, 255, 255, 0.1) inset',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0,
          }}
        >
          <ShieldCheck className="w-3 h-3 mr-2" style={{ color: '#C5A35D', opacity: 0.6 }} />
          <span 
            className="font-sans uppercase"
            style={{ 
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.3em',
              color: '#E5E5E5',
              opacity: 0.4,
            }}
          >
            с 1998 • Москва
          </span>
        </motion.div>

        {/* Заголовок с посимвольной анимацией */}
        <motion.h1
          className="font-serif text-center font-light leading-[0.95] tracking-tight relative z-30 mb-8 md:mb-10"
          style={{ 
            fontSize: 'clamp(1.575rem, 3.5vw + 0.5rem, 4.2rem)',
            transform: 'translateY(6%)',
            color: '#FFFFFF',
          }}
        >
          {letters.map((letter, index) => {
            const isHighlight = index >= highlightStartIndex && index < highlightEndIndex
            return (
              <AnimatedLetter 
                key={index} 
                letter={letter} 
                index={index} 
                startDelay={titleStartDelay}
                isHighlight={isHighlight}
              />
            )
          })}
        </motion.h1>

        {/* Подзаголовок с акцентами на числах */}
        <motion.p
          className="font-sans max-w-2xl text-center leading-relaxed relative z-10"
          style={{ 
            color: '#E5E5E5',
            fontSize: 'clamp(0.7rem, 1.2vw + 0.3rem, 0.875rem)',
            opacity: 0.7,
            textShadow: '0 1px 2px rgba(0,0,0,0.6)', // Заменяем drop-shadow на text-shadow
            transform: 'translateY(-5%)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1],
            delay: titleStartDelay + letters.length * 0.03 + 0.2,
          }}
        >
          Создаем входные группы, которые становятся главной деталью вашего интерьера.{' '}
          Сочетание итальянского дизайна и московской надежности.
        </motion.p>

        {/* Кнопка */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            delay: titleStartDelay + letters.length * 0.03 + 0.4,
          }}
          className="mt-8 md:mt-12"
        >
          <Link
            href="/catalog"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 border border-white/20 text-white font-sans text-sm md:text-base tracking-wider overflow-hidden"
            style={{ color: '#E5E5E5' }}
          >
            {/* Фон для эффекта заполнения */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                transformOrigin: 'left',
              }}
            />
            {/* Текст кнопки */}
            <span className="relative z-10 transition-colors duration-300" style={{ color: isHovered ? '#000000' : '#E5E5E5' }}>
              Смотреть каталог
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Mobile texture overlay - убран для производительности */}
    </div>
  )
}
