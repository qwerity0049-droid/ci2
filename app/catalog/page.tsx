'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'

// Данные продуктов
const products = [
  {
    id: 1,
    title: 'ПАРАДНЫЕ ПОРТАЛЫ',
    description: 'Архитектурные доминанты для частных резиденций. Поворотные механизмы и терморазрыв.',
    image: '/images/catalog/door1.png',
  },
  {
    id: 2,
    title: 'ГОРОДСКИЕ ДВЕРИ',
    description: 'Бескомпромиссная защита в эстетике минимализма. Высший класс взломостойкости.',
    image: '/images/catalog/door2.png',
  },
  {
    id: 3,
    title: 'ЭЛЕМЕНТЫ ДЕКОРА',
    description: 'Индивидуальное обрамление проемов, капители, порталы и эксклюзивные отделочные панели.',
    image: '/images/catalog/door3.png?v=2',
  },
  {
    id: 4,
    title: 'ДИЗАЙНЕРСКАЯ ФУРНИТУРА',
    description: 'Ювелирная точность механизмов. Ручки и замковые системы от ведущих ателье Европы.',
    image: '/images/catalog/door4.png',
  },
]

// Фильтры навигации
const filters = [
  { id: 'all', label: 'ВСЕ МОДЕЛИ' },
  { id: 'parade', label: 'ПАРАДНЫЕ ПОРТАЛЫ' },
  { id: 'apartment', label: 'КВАРТИРНЫЕ ДВЕРИ' },
  { id: 'decor', label: 'ДЕКОР' },
  { id: 'furniture', label: 'ФУРНИТУРА' },
]

export default function CatalogPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  // Анимация появления для элементов
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0D0D0D' }}>
      <Header />
      
      {/* Блок 1: Hero */}
      <section className="relative w-full py-24 md:py-32 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#0D0D0D' }}>
        <motion.div
          className="relative max-w-4xl mx-auto text-center z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8" style={{ color: '#FFFFFF' }}>
            Входные архитектурные решения
          </h1>
          <p className="font-inter text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto text-white/60">
            В дверях STALTEHNO безопасность и надежность сочетаются с дизайном и экстремальной кастомизацией.
          </p>
        </motion.div>
      </section>

      {/* Блок 2: Сетка продуктов (2x2) */}
      <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#0D0D0D' }}>
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {products.map((product, index) => (
            <>
              {/* Разделительная линия перед элементами второго ряда (индексы 2 и 3) на десктопе */}
              {index === 2 && (
                <div className="hidden md:block md:col-span-2 border-t border-white/5 mb-12 md:mb-16" />
              )}
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="group cursor-pointer flex flex-col transition-all duration-300 relative rounded-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  border: '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#D4AF37'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent'
                }}
              >
                {/* Изображение */}
                <div className="relative w-full h-[400px] md:h-[500px] mb-6 md:mb-8 overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectPosition: 'center center',
                    }}
                  />
                </div>
                
                {/* Название с стрелочкой */}
                <div className="flex items-center gap-3 mb-3 md:mb-4 px-6">
                  <h3 
                    className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-bold uppercase"
                    style={{ color: '#FFFFFF' }}
                  >
                    {product.title}
                  </h3>
                  {/* Стрелочка */}
                  <svg 
                    className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: '#FFFFFF' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                {/* Описание */}
                <p 
                  className="font-inter leading-relaxed flex-grow px-6 pb-6" 
                  style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}
                >
                  {product.description}
                </p>
              </motion.div>
            </>
          ))}
        </motion.div>
      </section>

      {/* Блок 3: Фильтр-навигация */}
      <section className="py-12 md:py-16 px-4 md:px-8 lg:px-16 border-t border-white/5" style={{ backgroundColor: '#0D0D0D' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className="font-inter text-xs md:text-sm uppercase tracking-widest relative pb-2 transition-colors duration-300 font-light flex items-center gap-2"
                style={{
                  color: activeFilter === filter.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                  fontWeight: 300,
                }}
              >
                {/* Номер категории золотым цветом */}
                <span style={{ color: '#D4AF37', fontWeight: 600 }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{filter.label}</span>
                {activeFilter === filter.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1px]"
                    style={{ backgroundColor: '#D4AF37' }}
                    layoutId="activeFilter"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Блок 4: Финальный баннер */}
      <section className="relative w-full py-24 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: '#0D0D0D' }}>
        {/* Контент */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8"
            style={{ color: '#FFFFFF' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Ваше воображение не знает границ
          </motion.h2>
          <motion.p
            className="font-inter text-lg md:text-xl lg:text-2xl leading-relaxed text-white/60"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Наши двери меняют правила и расширяют границы безопасности.
          </motion.p>
        </div>
      </section>
    </main>
  )
}
