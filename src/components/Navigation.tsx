'use client'

import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gradient">
              TravelAI
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="/" className="text-white hover:text-primary-400 transition-colors duration-300">Home</a>
              <a href="/map" className="text-white hover:text-primary-400 transition-colors duration-300">Map</a>
              <a href="#features" className="text-white hover:text-primary-400 transition-colors duration-300">Features</a>
              <a href="#about" className="text-white hover:text-primary-400 transition-colors duration-300">About</a>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-primary-400 transition-colors duration-300">
                Sign In
              </button>
              <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-primary-400 transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="text-white hover:text-primary-400 block px-3 py-2 transition-colors duration-300">Home</a>
            <a href="/map" className="text-white hover:text-primary-400 block px-3 py-2 transition-colors duration-300">Map</a>
            <a href="#features" className="text-white hover:text-primary-400 block px-3 py-2 transition-colors duration-300">Features</a>
            <a href="#about" className="text-white hover:text-primary-400 block px-3 py-2 transition-colors duration-300">About</a>
          </div>
          <div className="px-5 py-3 border-t border-white/10">
            <button className="text-white hover:text-primary-400 block mb-2 transition-colors duration-300">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full font-semibold w-full">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}