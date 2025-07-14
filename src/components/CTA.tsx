export default function CTA() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-effect rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Start Your
              <br />
              <span className="text-gradient">Perfect Journey?</span>
            </h2>
            
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered their dream destinations with our AI-powered recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/map" className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <span className="relative z-10">Get Started Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <a href="/map" className="glass-effect px-8 py-4 rounded-full text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                View Demo
              </a>
            </div>
          </div>
          
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-accent-400/30 to-accent-600/30 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-full blur-xl"></div>
        </div>
      </div>
    </section>
  )
}