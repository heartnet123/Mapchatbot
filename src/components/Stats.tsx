'use client'

import { useState, useEffect } from 'react'

export default function Stats() {
  const [counters, setCounters] = useState({
    destinations: 0,
    users: 0,
    recommendations: 0,
    satisfaction: 0
  })

  useEffect(() => {
    const targets = {
      destinations: 1000,
      users: 50000,
      recommendations: 250000,
      satisfaction: 98
    }

    const duration = 2000
    const steps = 60

    const increment = (target: number) => target / steps
    
    const timer = setInterval(() => {
      setCounters(prev => ({
        destinations: Math.min(prev.destinations + increment(targets.destinations), targets.destinations),
        users: Math.min(prev.users + increment(targets.users), targets.users),
        recommendations: Math.min(prev.recommendations + increment(targets.recommendations), targets.recommendations),
        satisfaction: Math.min(prev.satisfaction + increment(targets.satisfaction), targets.satisfaction)
      }))
    }, duration / steps)

    setTimeout(() => clearInterval(timer), duration)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      label: "Destinations",
      value: Math.floor(counters.destinations).toLocaleString(),
      suffix: "+",
      gradient: "from-primary-500 to-primary-600"
    },
    {
      label: "Happy Travelers",
      value: Math.floor(counters.users).toLocaleString(),
      suffix: "+",
      gradient: "from-secondary-500 to-secondary-600"
    },
    {
      label: "Recommendations",
      value: Math.floor(counters.recommendations).toLocaleString(),
      suffix: "+",
      gradient: "from-accent-500 to-accent-600"
    },
    {
      label: "Satisfaction Rate",
      value: Math.floor(counters.satisfaction).toString(),
      suffix: "%",
      gradient: "from-primary-400 to-secondary-400"
    }
  ]

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Join a growing community of travelers who have discovered their perfect destinations through our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass-effect rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className={`text-6xl font-bold bg-gradient-to-r ${stat.gradient} text-transparent bg-clip-text mb-4`}>
                {stat.value}{stat.suffix}
              </div>
              <p className="text-neutral-300 text-lg font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}