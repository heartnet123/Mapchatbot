import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Stats from '@/components/Stats'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <Features />
      <Stats />
      <CTA />
    </div>
  )
}