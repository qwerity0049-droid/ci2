'use client'

import { motion } from 'framer-motion'

const features = [
  {
    title: 'Тишина',
    description: 'Абсолютная звукоизоляция. Многослойная система уплотнения для полной тишины в доме.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: 'Защита',
    description: 'Интеллектуальная безопасность. Бронированная сталь и лучшие итальянские замковые системы.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Дизайн',
    description: 'Индивидуальный стиль. Огромный выбор отделок — от натурального камня до редких пород дерева.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-noir-bg">
      <div className="container mx-auto max-w-7xl">
        {/* Заголовок */}
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-center text-white mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Совершенство в деталях
        </motion.h2>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative border border-white/10 rounded-lg p-6 md:p-8 hover:border-white/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Эффект свечения при наведении - blur убран */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-[1px] rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>

              {/* Контент */}
              <div className="relative z-10">
                {/* Иконка */}
                <div className="text-white/80 group-hover:text-white transition-colors duration-300 mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-white mb-4">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
