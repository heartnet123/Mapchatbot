interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
  delay?: number
}

export default function FeatureCard({ icon, title, description, gradient, delay = 0 }: FeatureCardProps) {
  return (
    <div 
      className="group relative card-hover glass-effect rounded-2xl p-8 h-full"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${gradient} mb-6`}>
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-neutral-300 leading-relaxed">{description}</p>
      </div>
      
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/60">
          <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}