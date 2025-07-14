export interface UserProfile {
  id: string
  email: string
  name: string
  preferences: {
    interests: string[]
    budget: 'low' | 'medium' | 'high'
    travelStyle: 'adventure' | 'relaxation' | 'cultural' | 'luxury'
    foodPreferences: string[]
    accessibility: string[]
  }
  createdAt: Date
  updatedAt: Date
}

export interface TravelRecommendation {
  id: string
  title: string
  description: string
  category: string
  location: {
    lat: number
    lng: number
    address: string
  }
  rating: number
  priceRange: 'low' | 'medium' | 'high'
  tags: string[]
  imageUrl?: string
  personalizedReason?: string
}

export interface ChatMessage {
  id: string
  userId: string
  content: string
  role: 'user' | 'assistant'
  recommendations?: TravelRecommendation[]
  timestamp: Date
}

export interface VectorDocument {
  id: string
  content: string
  metadata: {
    category: string
    location: string
    tags: string[]
    rating: number
    priceRange: string
  }
  embedding: number[]
}