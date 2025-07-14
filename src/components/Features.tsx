import FeatureCard from './FeatureCard'

export default function Features() {
  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms analyze your preferences to deliver perfectly tailored travel recommendations.",
      gradient: "bg-gradient-to-br from-primary-500 to-primary-600",
      delay: 0
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Interactive Mapping",
      description: "Explore destinations with beautiful, interactive maps powered by cutting-edge visualization technology.",
      gradient: "bg-gradient-to-br from-secondary-500 to-secondary-600",
      delay: 200
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Personal Profiles",
      description: "Create detailed preference profiles that evolve with your travel experiences for increasingly accurate suggestions.",
      gradient: "bg-gradient-to-br from-accent-500 to-accent-600",
      delay: 400
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Real-time Updates",
      description: "Get instant access to the latest information with our retrieval-augmented generation technology.",
      gradient: "bg-gradient-to-br from-primary-400 to-secondary-400",
      delay: 600
    }
  ]

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Experience the future of travel planning with our innovative features designed to make your journey unforgettable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  )
}