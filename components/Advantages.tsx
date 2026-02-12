'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { History, VolumeX, Lock, Hash, Palette } from 'lucide-react'

const accentColor = '#C5A35D'
const textColor = '#E5E5E5'

const advantages = [
  {
    title: '14 000+ решений',
    description: '25+ лет опыта в проектировании дверей высшего класса.',
    icon: History,
  },
  {
    title: 'Тишина 55 дБ',
    description: 'Многослойная изоляция, создающая абсолютный комфорт.',
    icon: VolumeX,
  },
  {
    title: 'Стальной щит',
    description: '4-й класс взломостойкости и бронированные пластины 10 мм.',
    icon: Lock,
  },
  {
    title: 'Цифровой контроль',
    description: 'Умные ручки с доступом по коду. Ваша личная комбинация безопасности без лишних ключей.',
    icon: Hash,
  },
  {
    title: 'Индивидуальный стиль',
    description: 'Отделка натуральным камнем и редкими породами дерева.',
    icon: Palette,
  },
]

export default function Advantages() {
  // Первая строка: длинная + короткая
  const firstRowLong = advantages[0]
  const firstRowShort = advantages[1]
  
  // Вторая строка: три короткие
  const secondRow = advantages.slice(2, 5)

  return (
    <section className="py-16 md:py-24 pb-[15vh] md:pb-[8vh] px-6 md:px-6 md:px-20 bg-noir-bg relative">
      {/* Noise эффект на фоне - убран mix-blend для производительности */}
      <div className="absolute inset-0 noise-bg pointer-events-none" style={{ opacity: 0.015 }} />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Заголовок блока */}
        <motion.div
          className="text-center mb-12 md:mb-16 px-6 md:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-6 glaido-text"
            style={{ color: textColor }}
          >
            Безопасность как{' '}
            <span style={{ color: accentColor }}>искусство</span>
          </h2>
          <p
            className="font-sans text-base md:text-lg opacity-60 max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              color: textColor,
            }}
          >
            Мы создаем не просто двери, а инженерные шедевры, где каждый элемент работает на ваше спокойствие.
          </p>
        </motion.div>

        {/* Первая строка: одна длинная + одна короткая */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6 px-4 md:px-0">
          <div className="md:col-span-2">
            <AdvantageCard 
              key={firstRowLong.title} 
              advantage={firstRowLong} 
              index={0}
            />
          </div>
          <div>
            <AdvantageCard 
              key={firstRowShort.title} 
              advantage={firstRowShort} 
              index={1}
            />
          </div>
        </div>

        {/* Вторая строка: три короткие */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
          {secondRow.map((advantage, index) => (
            <AdvantageCard 
              key={advantage.title} 
              advantage={advantage} 
              index={index + 2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function AdvantageCard({ 
  advantage, 
  index
}: { 
  advantage: typeof advantages[0]
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  const IconComponent = advantage.icon

  return (
    <div
      className="relative group overflow-hidden rounded-3xl h-full"
      style={{
        height: '180px', // Фиксированная высота для всех карточек
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        outline: isHovered ? '1px solid #D4AF37' : '1px solid transparent',
        transition: 'all 0.4s ease-out',
        boxShadow: isHovered ? '0 0 0 1px #D4AF37' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Контент - горизонтальная плашка */}
      <div 
        className="relative z-10 flex items-center h-full"
        style={{ 
          padding: '2.25rem', // Увеличено в 1.5 раза (1.5rem * 1.5)
          position: 'relative',
        }}
      >
        {/* Иконка слева в темной круглой подложке */}
        <div className="flex-shrink-0">
          <div
            className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full relative"
            style={{
              backgroundColor: 'rgba(5, 5, 5, 0.8)', // Темная подложка как на фото
            }}
          >
            <IconComponent 
              className="text-white" 
              strokeWidth={isHovered ? 1.8 : 1.5}
              style={{ 
                width: '24px',
                height: '24px',
                color: accentColor,
                opacity: isHovered ? 1 : 0.4,
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.4s ease-out',
              }}
            />
          </div>
        </div>

        {/* Текст справа */}
        <div className="ml-4 md:ml-5 lg:ml-6 flex-1 min-w-0">
          {/* Заголовок - исходный размер */}
          <h3 
            className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-serif text-left mb-1 md:mb-1.5"
            style={{ 
              color: textColor,
              fontFamily: 'var(--font-cormorant), serif',
              fontWeight: 700,
            }}
          >
            {advantage.title}
          </h3>
          
          {/* Описание - исходный размер */}
          <p 
            className="text-sm md:text-base leading-relaxed text-left"
            style={{ 
              color: textColor,
              opacity: 0.6,
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
            }}
          >
            {advantage.description}
          </p>
        </div>
      </div>
    </div>
  )
}
