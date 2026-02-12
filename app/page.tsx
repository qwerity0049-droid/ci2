import Hero from '@/components/Hero'
import Header from '@/components/Header'
import Advantages from '@/components/Advantages'
import ClientJourney from '@/components/ClientJourney'
import GlowOrbs from '@/components/GlowOrbs'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Плавающие световые пятна (Glow Orbs) */}
      <GlowOrbs />
      
      <Header />
      <Hero />
      <Advantages />
      <ClientJourney />
    </main>
  )
}
