# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Database Commands
- `npm run db:generate` - Generate Prisma client after schema changes
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and apply new migration
- `npm run db:studio` - Open Prisma Studio for database management
- `npm run setup:vector-db` - Initialize Supabase vector database tables and functions

## Architecture Overview

This is a Next.js 15 travel recommendation application that combines AI-powered chat with interactive maps. The system uses RAG (Retrieval-Augmented Generation) to provide personalized travel recommendations.

### Key Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth0 
- **AI/LLM**: OpenAI API with LangChain
- **Vector Database**: Supabase with pgvector extension
- **Maps**: Mapbox GL JS with react-map-gl

### LangChain Setup
- **Packages**: `@langchain/core`, `@langchain/openai`, `@langchain/community`, `@langchain/anthropic`, `@langchain/textsplitters`
- **Models**: GPT-4o-mini for chat, text-embedding-3-small for embeddings
- **Vector Store**: Supabase with 1536-dimension embeddings
- **Configuration**: Centralized in `src/lib/langchain-config.ts`

### Core Architecture Components

#### Data Layer
- **Prisma Schema**: Defines three main models:
  - `UserProfile`: User authentication and preferences
  - `ChatMessage`: Chat history with role-based messages
  - `TravelLocation`: POI data with coordinates and metadata
- **Vector Storage**: Supabase handles document embeddings for RAG

#### Application Structure
- **Pages**: App Router structure with `/map` route for main interface
- **Components**: Modular React components including:
  - `MapWithRecommendations`: Core map component with marker management
  - `Map`: Base Mapbox wrapper component
  - Landing page components (Hero, Features, Stats, etc.)

#### Key Features
- **Personalized Recommendations**: AI analyzes user preferences and chat context
- **Interactive Maps**: Real-time marker placement with popups and bounds fitting
- **Chat Interface**: Conversational UI for travel queries
- **User Profiles**: Preference-based personalization system

### Configuration Files
- **TypeScript**: Uses path mapping (`@/*` → `./src/*`)
- **Environment**: `.env.example` shows required API keys for Auth0, OpenAI, Supabase, and Mapbox
- **Next.js**: Standard configuration with App Router enabled
- **Environment Validation**: `src/lib/env.ts` validates all required environment variables

### Key Files Structure
- **`src/lib/langchain-config.ts`**: LangChain models and vector store configuration
- **`src/lib/vectorstore.ts`**: Vector operations for travel location embeddings
- **`src/lib/database.ts`**: Prisma client setup with global instance
- **`src/lib/env.ts`**: Environment variable validation with Zod
- **`src/lib/utils.ts`**: Utility functions for coordinates, text, and general helpers
- **`scripts/setup-vector-db.js`**: Automated Supabase vector database setup
- **`supabase/migrations/001_vector_store.sql`**: SQL migrations for pgvector setup

### Important Implementation Details
- **Environment Validation**: All required env vars are validated on startup using Zod
- **Vector Database**: pgvector extension with cosine similarity search
- **Map Components**: Client-side rendering with proper marker cleanup
- **Type Safety**: Comprehensive TypeScript interfaces for all LangChain operations
- **Database Setup**: Automated scripts for vector store initialization
- **Utility Functions**: Ready-to-use helpers for coordinates, text processing, and common operations