import { vectorStore, supabaseClient } from './langchain-config'
import type { TravelRecommendation } from '@/types'

export interface TravelDocument {
  content: string
  metadata: {
    id: string
    title: string
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
  }
}

export async function addTravelLocation(location: TravelRecommendation) {
  const document: TravelDocument = {
    content: `${location.title}. ${location.description}. Category: ${location.category}. Location: ${location.location.address}. Rating: ${location.rating}/5. Price range: ${location.priceRange}. Tags: ${location.tags.join(', ')}.`,
    metadata: {
      id: location.id,
      title: location.title,
      category: location.category,
      location: location.location,
      rating: location.rating,
      priceRange: location.priceRange,
      tags: location.tags,
      imageUrl: location.imageUrl,
    }
  }

  await vectorStore.addDocuments([{
    pageContent: document.content,
    metadata: document.metadata
  }])
}

export async function searchSimilarLocations(
  query: string,
  limit: number = 5,
  filter?: Record<string, any>
) {
  const results = await vectorStore.similaritySearch(query, limit, filter)
  
  return results.map((doc: any) => ({
    id: doc.metadata.id,
    title: doc.metadata.title,
    description: doc.pageContent,
    category: doc.metadata.category,
    location: doc.metadata.location,
    rating: doc.metadata.rating,
    priceRange: doc.metadata.priceRange,
    tags: doc.metadata.tags,
    imageUrl: doc.metadata.imageUrl,
  })) as TravelRecommendation[]
}

export async function initializeVectorStore() {
  try {
    const { data, error } = await supabaseClient.rpc('check_documents_table')
    if (error && error.code === '42P01') {
      console.log('Creating vector store table...')
      await createVectorStoreTable()
    }
  } catch (err) {
    console.log('Initializing vector store for first time...')
    await createVectorStoreTable()
  }
}

async function createVectorStoreTable() {
  const { error } = await supabaseClient.rpc('create_documents_table')
  if (error) {
    console.error('Error creating vector store table:', error)
    throw error
  }
  console.log('Vector store table created successfully')
}