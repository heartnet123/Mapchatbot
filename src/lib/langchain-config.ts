import { ChatOpenAI } from '@langchain/openai'
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf"
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
import { createClient } from '@supabase/supabase-js'
import { env } from './env'

// OpenRouter Chat Model Configuration
export const chatModel = new ChatOpenAI({
  apiKey: env.OPENROUTER_API_KEY,
  modelName: 'moonshotai/kimi-k2:free',
  temperature: 0.7,
  maxTokens: 2000,
  configuration: {
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'Bangkok Travel Chatbot'
    }
  }
})

// Hugging Face Embeddings Configuration (API-based, no local dependencies)
export const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: env.HUGGINGFACEHUB_API_KEY || process.env.HUGGINGFACEHUB_API_KEY || undefined,
  model: "thenlper/gte-large",
})

// Supabase Client Configuration
export const supabaseClient = createClient(
  env.SUPABASE_URL!,
  env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
)

// Vector Store Configuration
export const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: 'documents',
  queryName: 'match_documents',
})

// LangChain Configuration Constants
export const LANGCHAIN_CONFIG = {
  // Model settings
  MODEL_NAME: 'moonshotai/kimi-k2:free',
  EMBEDDING_MODEL: 'thenlper/gte-large',
  EMBEDDING_DIMENSIONS: 1024,
  
  // Vector search settings
  SIMILARITY_THRESHOLD: 0.78,
  MAX_SEARCH_RESULTS: 5,
  
  // Chat settings
  MAX_TOKENS: 2000,
  TEMPERATURE: 0.7,
  
  // Database settings
  VECTOR_TABLE_NAME: 'documents',
  MATCH_FUNCTION_NAME: 'match_documents',
  
  // Chunk settings for text splitting
  CHUNK_SIZE: 1000,
  CHUNK_OVERLAP: 200,
} as const

export type LangChainConfig = typeof LANGCHAIN_CONFIG