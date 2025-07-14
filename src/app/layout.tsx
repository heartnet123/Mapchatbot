import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FYP Map Chatbot RAG',
  description: 'Personalized travel recommendations with AI and maps',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="relative min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}