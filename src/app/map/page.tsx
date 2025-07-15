'use client'

import { useState, useEffect } from 'react'
import MapWithRecommendations from '@/components/MapWithRecommendations'
import { TravelRecommendation } from '@/types'

export default function MapPage() {
  const [recommendations, setRecommendations] = useState<TravelRecommendation[]>([])
  const [selectedRecommendation, setSelectedRecommendation] = useState<TravelRecommendation | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Bangkok travel destinations for demonstration
  const mockRecommendations: TravelRecommendation[] = [
    {
      id: '1',
      title: 'Grand Palace',
      description: 'Historic royal palace complex and home to the Emerald Buddha',
      category: 'Historic Site',
      location: {
        lat: 13.7500,
        lng: 100.4915,
        address: 'Na Phra Lan Road, Phra Borom Maha Ratchawang, Bangkok'
      },
      rating: 4.6,
      priceRange: 'medium',
      tags: ['history', 'architecture', 'culture', 'temple'],
      imageUrl: '/api/placeholder/400/300',
      personalizedReason: 'Perfect for your interest in Thai culture and royal history'
    },
    {
      id: '2',
      title: 'Wat Arun',
      description: 'Temple of Dawn with stunning riverside views and intricate design',
      category: 'Temple',
      location: {
        lat: 13.7437,
        lng: 100.4888,
        address: '158 Thanon Wang Doem, Wat Arun, Bangkok'
      },
      rating: 4.5,
      priceRange: 'low',
      tags: ['temple', 'culture', 'riverside', 'sunset'],
      imageUrl: '/api/placeholder/400/300',
      personalizedReason: 'Ideal for peaceful temple visits and photography'
    },
    {
      id: '3',
      title: 'Chatuchak Weekend Market',
      description: 'Massive weekend market with food, crafts, and unique finds',
      category: 'Market',
      location: {
        lat: 13.7998,
        lng: 100.5502,
        address: '587/10 Kamphaeng Phet 2 Road, Chatuchak, Bangkok'
      },
      rating: 4.3,
      priceRange: 'low',
      tags: ['shopping', 'food', 'local', 'weekend'],
      imageUrl: '/api/placeholder/400/300',
      personalizedReason: 'Great for discovering authentic Thai crafts and street food'
    },
    {
      id: '4',
      title: 'Wat Pho (Temple of the Reclining Buddha)',
      description: 'Famous temple housing the giant reclining Buddha statue',
      category: 'Temple',
      location: {
        lat: 13.7465,
        lng: 100.4927,
        address: '2 Sanamchai Road, Grand Palace Subdistrict, Bangkok'
      },
      rating: 4.7,
      priceRange: 'low',
      tags: ['temple', 'buddha', 'massage', 'culture'],
      imageUrl: '/api/placeholder/400/300',
      personalizedReason: 'Perfect for experiencing traditional Thai massage and Buddhist culture'
    },
    {
      id: '5',
      title: 'Khao San Road',
      description: 'Famous backpacker street with nightlife, street food, and shops',
      category: 'Nightlife',
      location: {
        lat: 13.7590,
        lng: 100.4977,
        address: 'Khao San Road, Talat Yot, Phra Nakhon, Bangkok'
      },
      rating: 4.0,
      priceRange: 'low',
      tags: ['nightlife', 'street food', 'backpacker', 'shopping'],
      imageUrl: '/api/placeholder/400/300',
      personalizedReason: 'Great for experiencing Bangkok nightlife and street food culture'
    },
    {
      id: '6',
      title: 'Jim Thompson House',
      description: 'Traditional Thai house museum showcasing silk and art',
      category: 'Museum',
      location: {
        lat: 13.7469,
        lng: 100.5344,
        address: '6 Soi Kasemsan 2, Rama 1 Road, Wang Mai, Bangkok'
      },
      rating: 4.4,
      priceRange: 'medium',
      tags: ['museum', 'silk', 'art', 'traditional'],
      imageUrl: '/api/placeholder/400/300',
      personalizedReason: 'Perfect for understanding Thai silk heritage and traditional architecture'
    },
    {
      id: '7',
      title: 'Lumpini Park',
      description: 'Large green park in the heart of Bangkok for relaxation',
      category: 'Park',
      location: {
        lat: 13.7307,
        lng: 100.5418,
        address: 'Lumphini, Pathum Wan District, Bangkok'
      },
      rating: 4.2,
      priceRange: 'low',
      tags: ['park', 'nature', 'exercise', 'relaxation'],
      imageUrl: '/api/placeholder/400/300',
      personalizedReason: 'Great for morning exercise and escaping city hustle'
    },
    {
      id: '8',
      title: 'Chinatown (Yaowarat)',
      description: 'Vibrant Chinese district with amazing street food and gold shops',
      category: 'District',
      location: {
        lat: 13.7398,
        lng: 100.5067,
        address: 'Yaowarat Road, Samphanthawong, Bangkok'
      },
      rating: 4.3,
      priceRange: 'low',
      tags: ['food', 'chinese', 'street food', 'shopping'],
      imageUrl: '/api/placeholder/400/300',
      personalizedReason: 'Perfect for exploring diverse food culture and authentic Chinese cuisine'
    }
  ]

  useEffect(() => {
    // Simulate loading recommendations
    setIsLoading(true)
    setTimeout(() => {
      setRecommendations(mockRecommendations)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleRecommendationClick = (recommendation: TravelRecommendation) => {
    setSelectedRecommendation(recommendation)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800">
      {/* Main Content */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 glass-effect m-4 rounded-2xl p-6 overflow-y-auto">
          <h2 className="text-xl font-bold text-white mb-4">
            Bangkok Destinations
          </h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-neutral-700 rounded mb-2"></div>
                  <div className="h-3 bg-neutral-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => handleRecommendationClick(rec)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedRecommendation?.id === rec.id
                      ? 'bg-primary-500/20 border border-primary-500'
                      : 'bg-neutral-800/50 hover:bg-neutral-700/50'
                  }`}
                >
                  <h3 className="font-semibold text-white mb-1">{rec.title}</h3>
                  <p className="text-neutral-300 text-sm mb-2">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary-400">{rec.category}</span>
                    <span className="text-xs text-accent-400">★ {rec.rating}</span>
                  </div>
                  {rec.personalizedReason && (
                    <p className="text-xs text-neutral-400 mt-2 italic">
                      {rec.personalizedReason}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Map */}
        <div className="flex-1 m-4 ml-0">
          <MapWithRecommendations
            recommendations={recommendations}
            className="h-full"
            onRecommendationClick={handleRecommendationClick}
          />
        </div>
      </div>
    </div>
  )
}