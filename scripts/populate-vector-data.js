#!/usr/bin/env node

/**
 * Script to populate vector store with Bangkok travel locations
 */

require('dotenv').config({ path: '.env.local' })
const { HuggingFaceInferenceEmbeddings } = require("@langchain/community/embeddings/hf")
const { SupabaseVectorStore } = require('@langchain/community/vectorstores/supabase')
const { createClient } = require('@supabase/supabase-js')

// Sample Bangkok travel locations
const bangkokLocations = [
  {
    id: "wat-pho",
    title: "Wat Pho (Temple of the Reclining Buddha)",
    description: "Famous Buddhist temple housing a giant 46-meter gold-plated reclining Buddha statue and traditional Thai massage school. One of Bangkok's oldest temples with beautiful architecture and peaceful atmosphere.",
    category: "Temple",
    location: { lat: 13.7465, lng: 100.4927, address: "2 Sanamchai Road, Grand Palace Subdistrict, Bangkok" },
    rating: 4.7,
    priceRange: "low",
    tags: ["temple", "buddha", "massage", "culture", "historic"]
  },
  {
    id: "grand-palace",
    title: "Grand Palace",
    description: "Historic royal palace complex and former residence of Thai kings. Home to the Emerald Buddha Temple (Wat Phra Kaew) with stunning traditional Thai architecture and intricate decorations.",
    category: "Historic Site",
    location: { lat: 13.75, lng: 100.4915, address: "Na Phra Lan Road, Phra Borom Maha Ratchawang, Bangkok" },
    rating: 4.6,
    priceRange: "medium",
    tags: ["history", "architecture", "culture", "temple", "royal"]
  },
  {
    id: "chatuchak-market",
    title: "Chatuchak Weekend Market",
    description: "One of the world's largest weekend markets with over 15,000 stalls selling everything from clothes and crafts to delicious street food. Perfect for shopping and experiencing local culture.",
    category: "Market",
    location: { lat: 13.7998, lng: 100.5502, address: "587/10 Kamphaeng Phet 2 Road, Chatuchak, Bangkok" },
    rating: 4.3,
    priceRange: "low",
    tags: ["shopping", "food", "local", "weekend", "crafts"]
  },
  {
    id: "khao-san-road",
    title: "Khao San Road",
    description: "Famous backpacker street known for vibrant nightlife, street food, budget accommodations, and shopping. The heart of Bangkok's backpacker scene with bars, restaurants, and travel agencies.",
    category: "Nightlife",
    location: { lat: 13.759, lng: 100.4977, address: "Khao San Road, Talat Yot, Phra Nakhon, Bangkok" },
    rating: 4.0,
    priceRange: "low",
    tags: ["nightlife", "street food", "backpacker", "shopping", "bars"]
  },
  {
    id: "jim-thompson-house",
    title: "Jim Thompson House",
    description: "Beautiful traditional Thai house museum showcasing Southeast Asian art and the story of American entrepreneur Jim Thompson who helped revive the Thai silk industry.",
    category: "Museum",
    location: { lat: 13.7441, lng: 100.5348, address: "6 Soi Kasemsan 2, Rama 1 Road, Wang Mai, Bangkok" },
    rating: 4.5,
    priceRange: "medium",
    tags: ["museum", "art", "culture", "silk", "traditional"]
  },
  {
    id: "wat-arun",
    title: "Wat Arun (Temple of Dawn)",
    description: "Iconic riverside temple known for its towering spire decorated with colorful porcelain and seashells. Offers stunning views of the Chao Phraya River, especially beautiful at sunset.",
    category: "Temple",
    location: { lat: 13.7437, lng: 100.4889, address: "158 Wang Doem Road, Wat Arun, Bangkok Yai, Bangkok" },
    rating: 4.6,
    priceRange: "low",
    tags: ["temple", "river", "sunset", "architecture", "views"]
  },
  {
    id: "floating-market-damnoen",
    title: "Damnoen Saduak Floating Market",
    description: "Traditional floating market where vendors sell fresh fruits, vegetables, and local food from boats. Experience authentic Thai culture and try delicious local specialties.",
    category: "Market",
    location: { lat: 13.5221, lng: 99.9551, address: "Damnoen Saduak District, Ratchaburi Province (day trip from Bangkok)" },
    rating: 4.2,
    priceRange: "medium",
    tags: ["floating market", "food", "traditional", "boats", "day trip"]
  },
  {
    id: "lumpini-park",
    title: "Lumpini Park",
    description: "Large green oasis in the heart of Bangkok perfect for jogging, tai chi, paddle boating, and escaping the city hustle. Popular spot for locals and tourists to relax and exercise.",
    category: "Park",
    location: { lat: 13.7307, lng: 100.5418, address: "Rama IV Road, Pathum Wan District, Bangkok" },
    rating: 4.4,
    priceRange: "low",
    tags: ["park", "exercise", "nature", "relaxation", "outdoor"]
  },
  {
    id: "mbk-center",
    title: "MBK Center",
    description: "Popular shopping mall known for electronics, fashion, souvenirs, and food court. Great place to shop for affordable goods and experience modern Bangkok shopping culture.",
    category: "Shopping",
    location: { lat: 13.7441, lng: 100.5300, address: "444 Phaya Thai Road, Wang Mai, Pathum Wan, Bangkok" },
    rating: 4.1,
    priceRange: "medium",
    tags: ["shopping", "mall", "electronics", "fashion", "food court"]
  },
  {
    id: "chinatown-yaowarat",
    title: "Chinatown (Yaowarat Road)",
    description: "Historic Chinese district famous for incredible street food, gold shops, traditional Chinese temples, and vibrant night markets. Food paradise with authentic Chinese-Thai cuisine.",
    category: "District",
    location: { lat: 13.7392, lng: 100.5095, address: "Yaowarat Road, Samphanthawong District, Bangkok" },
    rating: 4.5,
    priceRange: "low",
    tags: ["chinatown", "street food", "traditional", "temples", "night market"]
  }
]

async function populateVectorStore() {
  console.log('🚀 Populating vector store with Bangkok travel data...')
  
  try {
    // Initialize embeddings and vector store
    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGINGFACEHUB_API_KEY,
      model: "thenlper/gte-large",
    })
    
    const supabaseClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )
    
    const vectorStore = new SupabaseVectorStore(embeddings, {
      client: supabaseClient,
      tableName: 'documents',
      queryName: 'match_documents',
    })
    
    // Convert locations to documents
    const documents = bangkokLocations.map(location => ({
      pageContent: `${location.title}. ${location.description}. Category: ${location.category}. Location: ${location.location.address}. Rating: ${location.rating}/5. Price range: ${location.priceRange}. Tags: ${location.tags.join(', ')}.`,
      metadata: {
        id: location.id,
        title: location.title,
        category: location.category,
        location: location.location,
        rating: location.rating,
        priceRange: location.priceRange,
        tags: location.tags,
      }
    }))
    
    console.log(`📝 Adding ${documents.length} Bangkok locations to vector store...`)
    
    // Add documents in batches to avoid overwhelming the API
    const batchSize = 3
    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize)
      console.log(`   Adding batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(documents.length/batchSize)}...`)
      
      await vectorStore.addDocuments(batch)
      
      // Add delay between batches to respect API limits
      if (i + batchSize < documents.length) {
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
    
    console.log('✅ Vector store populated successfully!')
    
    // Test a search
    console.log('🔍 Testing search functionality...')
    const testResults = await vectorStore.similaritySearch("Buddhist temple Bangkok", 3)
    console.log(`Found ${testResults.length} results for "Buddhist temple Bangkok":`)
    testResults.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.metadata?.title || 'No title'}`)
    })
    
  } catch (error) {
    console.error('❌ Error populating vector store:', error.message)
    if (error.stack) {
      console.error('Stack trace:', error.stack)
    }
    process.exit(1)
  }
}

if (require.main === module) {
  populateVectorStore()
}

module.exports = { populateVectorStore, bangkokLocations }