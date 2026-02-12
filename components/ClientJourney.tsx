'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const stages = [
  {
    number: '01',
    category: 'Инженерия',
    title: 'Точность в основе',
    description: 'Каждый проект начинается с лазерного сканирования вашего проема в Москве.',
    image: '/images/step1.jpg',
  },
  {
    number: '02',
    category: 'Мощь',
    title: 'Сталь и мастерство',
    description: 'В Клине мы создаем конструкцию, способную противостоять любым вызовам.',
    image: '/images/step2.jpg?v=2',
  },
  {
    number: '03',
    category: 'Эстетика',
    title: 'Природная мощь',
    description: 'Отделка редкими породами дерева и натуральным сланцем. Мы превращаем бронированную сталь в предмет высокого искусства.',
    image: '/images/step3.jpg?v=2',
  },
  {
    number: '04',
    category: 'Финал',
    title: 'Безупречный финал',
    description: 'Совершенство в каждой детали. Ваша дверь — это баланс итальянской эстетики и абсолютной безопасности вашего дома.',
    image: '/images/step4.jpg',
  },
]

export default function ClientJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Анимация начинается когда верхняя граница блока зашла во вьюпорт (с учетом padding-top)
    offset: ['start end', 'end start'],
  })

  return (
    <section
      ref={containerRef}
      className="relative bg-noir-bg pt-[20vh] md:pt-[20vh] h-[640vh]"
      style={{ zIndex: 10 }}
    >
      {/* Desktop: Flex Row - Фото слева | Текст справа */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full flex flex-col md:flex-row">
          {/* Левая часть: Фотографии (50-60% ширины) - Sticky */}
          <div className="w-full md:w-[60%] h-[60vh] md:h-full relative">
            {stages.map((stage, index) => {
              // Перераспределение этапов: этап 1 уменьшен до 28%, этапы 2-4 увеличены
              // Этап 1: 0-0.28 (28%)
              // Этап 2: 0.28-0.52 (24%)
              // Этап 3: 0.52-0.76 (24%)
              // Этап 4: 0.76-1.0 (24%)
              let stageStart, stageEnd
              if (index === 0) {
                stageStart = 0
                stageEnd = 0.28 // Этап 1 занимает 28% скролла
              } else if (index === 1) {
                stageStart = 0.28
                stageEnd = 0.52 // Этап 2 занимает 24% скролла
              } else if (index === 2) {
                stageStart = 0.52
                stageEnd = 0.76 // Этап 3 занимает 24% скролла
              } else {
                stageStart = 0.76
                stageEnd = 1.0 // Этап 4 занимает 24% скролла
              }
              
              // Opacity фото меняется от 0 до 1 в пределах этапа
              // Для первого этапа: плавное появление с более длинным переходом
              // На мобилке первое фото появляется с задержкой для избежания наложения
              let photoOpacity
              if (index === 0) {
                photoOpacity = isMobile
                  ? useTransform(
                      scrollYProgress,
                      [0, 0.05, 0.12, stageEnd],
                      [0, 0, 1, 0]
                    )
                  : useTransform(
                      scrollYProgress,
                      [0, 0.05, 0.12, 0.18, stageEnd, stageEnd + 0.05],
                      [0, 0, 0.3, 1, 1, 0]
                    )
              } else if (index === stages.length - 1) {
                // Для последнего этапа: фото появляется ТОЛЬКО после полного исчезновения предыдущего (этап 3)
                // Этап 3 заканчивается на stageEnd = 0.76, поэтому этап 4 начинается строго после этого
                // Увеличена яркость фото этапа 4 - быстрее достигает полной видимости
                photoOpacity = useTransform(
                  scrollYProgress,
                  [stageStart, stageStart + 0.02, stageStart + 0.05, 0.98, 1],
                  [0, 0.7, 1, 1, 1]
                )
              } else if (index === 2) {
                // Для этапа 3: полностью исчезает ДО начала этапа 4 (строго к stageEnd = 0.76)
                photoOpacity = useTransform(
                  scrollYProgress,
                  [stageStart - 0.02, stageStart, stageEnd - 0.03, stageEnd - 0.01],
                  [0, 0.2, 1, 0]
                )
              } else {
                // Для промежуточных этапов (этап 2): полностью исчезают до начала следующего этапа
                photoOpacity = useTransform(
                  scrollYProgress,
                  [stageStart - 0.05, stageStart, stageEnd - 0.05, stageEnd],
                  [0, 0.2, 1, 0]
                )
              }


              // Y позиция для сканирующей линии (проходит сверху вниз один раз)
              const scanlineY = useTransform(
                scrollYProgress,
                index === 0
                  ? [0, stageStart + 0.05, stageStart + 0.15]
                  : [stageStart, stageStart + 0.05, stageStart + 0.15],
                ['-10px', '100%', '100%']
              )

              return (
                <motion.div
                  key={stage.number}
                  className="absolute inset-0 engineering-overlay"
                  style={{ 
                    opacity: photoOpacity,
                  }}
                  transition={index === 0 ? { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } : undefined}
                >
                  <Image
                    src={stage.image}
                    alt={stage.title}
                    fill
                    className="object-cover"
                    priority={index === 0 ? false : index === 1}
                    loading={index === 0 ? "lazy" : undefined}
                    style={{
                      maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                    }}
                  />
                  {/* Черный overlay для читаемости - убран для этапа 4 чтобы текст был виден */}
                  {index !== stages.length - 1 && (
                    <div 
                      className="absolute inset-0" 
                      style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.4)'
                      }} 
                    />
                  )}
                  
                  {/* Инженерная сетка (фоновая сетка) */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(197, 163, 93, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(197, 163, 93, 0.05) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Сканирующая линия (проходит один раз при появлении) */}
                  <motion.div
                    className="absolute left-0 right-0 h-[1px] bg-[#C5A35D]/30 pointer-events-none"
                    style={{
                      y: scanlineY,
                    }}
                  />

                </motion.div>
              )
            })}
          </div>

          {/* Правая часть: Текст (40% ширины) - Скроллится */}
          <div className="w-full md:w-[40%] h-[40vh] md:h-full bg-noir-bg relative z-10 flex items-center">
            {stages.map((stage, index) => {
              // Перераспределение этапов: этап 1 уменьшен до 28%, этапы 2-4 увеличены
              // Этап 1: 0-0.28 (28%)
              // Этап 2: 0.28-0.52 (24%)
              // Этап 3: 0.52-0.76 (24%)
              // Этап 4: 0.76-1.0 (24%)
              let stageStart, stageEnd
              if (index === 0) {
                stageStart = 0
                stageEnd = 0.28 // Этап 1 занимает 28% скролла
              } else if (index === 1) {
                stageStart = 0.28
                stageEnd = 0.52 // Этап 2 занимает 24% скролла
              } else if (index === 2) {
                stageStart = 0.52
                stageEnd = 0.76 // Этап 3 занимает 24% скролла
              } else {
                stageStart = 0.76
                stageEnd = 1.0 // Этап 4 занимает 24% скролла
              }
              const stageCenter = (stageStart + stageEnd) / 2

              // Opacity для текста: появляется с небольшой задержкой после фото
              // Для первого этапа: плавное появление текста с более длинным переходом
              const textOpacity = index === 0
                ? useTransform(
                    scrollYProgress,
                    [0.05, 0.1, 0.15, 0.2, stageEnd - 0.2, stageEnd - 0.05],
                    [0, 0.2, 0.5, 1, 1, 0]
                  )
                : index === stages.length - 1
                ? useTransform(
                    scrollYProgress,
                    [stageStart - 0.02, stageStart + 0.03, stageStart + 0.12, 0.95, 1],
                    [0, 0.4, 1, 1, 1]
                  )
                : useTransform(
                    scrollYProgress,
                    [stageStart + 0.05, stageCenter, stageEnd - 0.05],
                    [0, 1, 0]
                  )

              // Легкое смещение по Y для анимации с easeOut - плавное для первого этапа
              const textY = index === 0
                ? useTransform(
                    scrollYProgress,
                    [0.05, 0.1, 0.15, 0.2, stageEnd - 0.2, stageEnd - 0.05],
                    ['30px', '20px', '10px', '0px', '0px', '0px']
                  )
                : index === stages.length - 1
                ? useTransform(
                    scrollYProgress,
                    [stageStart - 0.02, stageStart + 0.03, stageStart + 0.12, 1],
                    ['20px', '15px', '0px', '0px']
                  )
                : useTransform(
                    scrollYProgress,
                    [stageStart + 0.05, stageCenter, stageEnd - 0.05],
                    ['20px', '0px', '0px']
                  )

              // Для кнопки CTA - анимация с задержкой
              const buttonOpacity = index === 3
                ? useTransform(
                    scrollYProgress,
                    [stageStart + 0.1, stageCenter, 1],
                    [0, 1, 1]
                  )
                : useTransform(scrollYProgress, [0, 1], [0, 0])
              
              const buttonY = index === 3
                ? useTransform(
                    scrollYProgress,
                    [stageStart + 0.1, stageCenter, 1],
                    ['30px', '0px', '0px']
                  )
                : useTransform(scrollYProgress, [0, 1], ['30px', '30px'])

              return (
                <motion.div
                  key={stage.number}
                  className="absolute inset-0 flex items-center justify-center md:justify-start px-4 sm:px-6 md:px-8 lg:px-12"
                  style={{
                    opacity: textOpacity,
                    y: textY,
                  }}
                  transition={index === 0 ? { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } : undefined}
                >
                  <div className="max-w-md text-center md:text-left w-full">
                    {index === 3 ? (
                      // Финальный этап - CTA стиль
                      <>
                        {/* Маленькая надпись 'THE RESULT' вместо цифры */}
                        <div
                          className="font-sans text-xs tracking-widest mb-4 md:mb-6 uppercase"
                          style={{ color: '#C5A35D', fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
                        >
                          THE RESULT
                        </div>

                        {/* Заголовок - крупнее, яркий белый цвет для читаемости */}
                        <h2
                          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 md:mb-6"
                          style={{ color: '#FFFFFF', lineHeight: '1.3' }}
                        >
                          {stage.title}
                        </h2>

                        {/* Описание - text-zinc-500 */}
                        <p
                          className="font-sans text-sm sm:text-base md:text-lg mb-6 md:mb-8"
                          style={{ color: '#71717a', lineHeight: '1.8' }}
                        >
                          {stage.description}
                        </p>

                        {/* Кнопка CTA с эффектом заполнения Glaido */}
                        <CTAButton
                          href="/catalog"
                          opacity={buttonOpacity}
                          y={buttonY}
                        />
                      </>
                    ) : (
                      // Обычные этапы
                      <>
                        {/* Номер этапа - крупный, цвет #C5A35D */}
                        <div
                          className="font-serif text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[15rem] leading-none mb-4 md:mb-6"
                          style={{ color: '#C5A35D' }}
                        >
                          {stage.number}
                        </div>

                        {/* Заголовок этапа - font-serif, #E5E5E5 */}
                        <h2
                          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-6"
                          style={{ color: '#E5E5E5', lineHeight: '1.4' }}
                        >
                          {stage.title}
                        </h2>

                        {/* Описание - text-zinc-500 */}
                        <p
                          className="font-sans text-sm sm:text-base md:text-lg"
                          style={{ color: '#71717a', lineHeight: '1.8' }}
                        >
                          {stage.description}
                        </p>
                      </>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// Компонент кнопки CTA с насыщенным золотым стилем
function CTAButton({ href, opacity, y }: { href: string; opacity: any; y: any }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative inline-block w-full md:w-auto"
      style={{
        opacity,
        y,
      }}
    >
      <Link
        href={href}
        className="relative inline-flex items-center justify-center w-full md:w-auto px-8 py-4 md:px-10 md:py-4 rounded-full font-sans text-base md:text-lg text-center uppercase font-extrabold overflow-hidden transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #FFEB3B 0%, #FFD700 25%, #FFC107 50%, #FFD700 75%, #FFEB3B 100%)',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          boxShadow: isHovered 
            ? '0 0 20px rgba(255, 215, 0, 0.8), 4px 4px 0px 0px #8B4513' 
            : '0 0 15px rgba(255, 215, 0, 0.6), 4px 4px 0px 0px #8B4513',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          filter: isHovered ? 'brightness(1.4) saturate(1.2)' : 'brightness(1.2) saturate(1.1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Эффект свечения */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
            opacity: isHovered ? 0.8 : 0.5,
            transition: 'opacity 0.3s',
          }}
        />
        {/* Текст кнопки */}
        <span
          className="relative z-10 transition-all duration-300"
          style={{
            color: '#000000',
            fontWeight: 900,
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
          }}
        >
          Рассчитать стоимость
        </span>
      </Link>
    </motion.div>
  )
}
