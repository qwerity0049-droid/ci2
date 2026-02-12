'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Lenis from '@studio-freight/lenis'
import Logo from './Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const isCatalogPage = pathname === '/catalog'
  
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  })
  
  // Логотип плавно уменьшается при скролле (только scale)
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  
  // Градиентный переход фона - на странице каталога остается темным, на других страницах как было
  const headerBgColor = useTransform(
    scrollYProgress,
    [0, 0.3],
    isCatalogPage 
      ? ['rgba(13, 13, 13, 0.95)', 'rgba(13, 13, 13, 0.98)']
      : ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.3)']
  )
  
  // Цвет текста меню - на странице каталога остается белым
  const menuTextColor = useTransform(
    scrollYProgress,
    [0, 0.3],
    isCatalogPage 
      ? ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.9)']
      : ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.8)']
  )
  
  // Цвет границы - на странице каталога остается светлым
  const borderColor = useTransform(
    scrollYProgress,
    [0, 0.3],
    isCatalogPage 
      ? ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.15)']
      : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)']
  )

  useEffect(() => {
    // Получаем экземпляр Lenis из window (если доступен)
    const checkLenis = () => {
      if (typeof window !== 'undefined') {
        const lenisInstance = (window as any).lenis
        if (lenisInstance) {
          setLenis(lenisInstance)
        } else {
          // Повторяем попытку через небольшую задержку, если Lenis еще не инициализирован
          setTimeout(checkLenis, 100)
        }
      }
    }
    checkLenis()
  }, [])

  const menuItems = [
    { label: 'ПРОЕКТЫ', href: '#projects', isExternal: false },
    { label: 'КАТАЛОГ', href: '/catalog', isExternal: true },
    { label: 'О НАС', href: '#about', isExternal: false },
    { label: 'КОНТАКТЫ', href: '#contacts', isExternal: false },
  ]

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement && lenis) {
      lenis.scrollTo(targetElement, {
        offset: -80, // Учитываем высоту хэдера
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else if (targetElement) {
      // Fallback для нативного скролла, если Lenis не загружен
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.header 
      ref={headerRef} 
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: headerBgColor,
        borderColor: borderColor,
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo с анимацией уменьшения при скролле */}
          <motion.div style={{ scale: logoScale }}>
            <Logo />
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => 
              item.isExternal ? (
                <motion.div
                  key={item.href}
                  style={{ color: menuTextColor }}
                >
                  <Link
                    href={item.href}
                    className="font-sans text-[13px] tracking-widest transition-colors duration-300 hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  style={{ color: menuTextColor }}
                  className="font-sans text-[13px] tracking-widest transition-colors duration-300 hover:opacity-70"
                >
                  {item.label}
                </motion.a>
              )
            )}
            {/* Номер телефона */}
            <motion.a
              href="tel:+74957955596"
              style={{ color: '#D4AF37' }}
              className="font-sans text-[13px] tracking-widest transition-colors duration-300 hover:opacity-80 ml-2"
            >
              +7 (495) 795-55-96
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: menuTextColor }}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t"
              style={{ borderColor: borderColor }}
            >
              <div className="py-4 space-y-4">
                {menuItems.map((item) => 
                  item.isExternal ? (
                    <motion.div
                      key={item.href}
                      style={{ color: menuTextColor }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block font-sans text-[13px] tracking-widest transition-colors duration-300 hover:opacity-70"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        handleSmoothScroll(e, item.href)
                        setIsMenuOpen(false)
                      }}
                      style={{ color: menuTextColor }}
                      className="block font-sans text-[13px] tracking-widest transition-colors duration-300 hover:opacity-70"
                    >
                      {item.label}
                    </motion.a>
                  )
                )}
                {/* Номер телефона в мобильном меню */}
                <motion.a
                  href="tel:+74957955596"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    color: '#D4AF37',
                    borderColor: borderColor,
                  }}
                  className="block font-sans text-[13px] tracking-widest transition-colors duration-300 hover:opacity-80 pt-2 border-t"
                >
                  +7 (495) 795-55-96
                </motion.a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
