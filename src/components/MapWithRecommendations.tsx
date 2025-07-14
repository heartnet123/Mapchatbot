'use client'

import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import mapboxgl from 'mapbox-gl'
import Map from './Map'
import { TravelRecommendation } from '@/types'

interface MapWithRecommendationsProps {
  recommendations: TravelRecommendation[]
  className?: string
  onRecommendationClick?: (recommendation: TravelRecommendation) => void
}

export default function MapWithRecommendations({ 
  recommendations, 
  className = '',
  onRecommendationClick 
}: MapWithRecommendationsProps) {
  const [map, setMap] = useState<mapboxgl.Map | null>(null)
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([])
  const [isMapReady, setIsMapReady] = useState(false)

  const handleMapLoad = useCallback((mapInstance: mapboxgl.Map) => {
    setMap(mapInstance)
    // Wait for style to be fully loaded
    const checkReady = () => {
      if (mapInstance.isStyleLoaded() && mapInstance.getCanvasContainer()) {
        setIsMapReady(true)
      } else {
        setTimeout(checkReady, 50)
      }
    }
    checkReady()
  }, [])

  useEffect(() => {
    if (!map || !isMapReady || !recommendations.length) return

    // Clear existing markers
    markers.forEach(marker => marker.remove())
    
    const newMarkers: mapboxgl.Marker[] = []

    recommendations.forEach((recommendation) => {
      // Create custom marker element
      const markerElement = document.createElement('div')
      markerElement.className = 'custom-marker'
      markerElement.innerHTML = `
        <div class="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-xl cursor-pointer hover:bg-red-600 transition-colors border-2 border-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: true
      }).setHTML(`
        <div class="p-3 max-w-sm">
          <h3 class="font-bold text-lg mb-2">${recommendation.title}</h3>
          <p class="text-gray-600 mb-3">${recommendation.description}</p>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500">${recommendation.category}</span>
            <span class="text-sm font-medium">★ ${recommendation.rating}</span>
          </div>
          ${recommendation.personalizedReason ? `
            <div class="mt-2 p-2 bg-blue-50 rounded text-sm">
              <strong>Why for you:</strong> ${recommendation.personalizedReason}
            </div>
          ` : ''}
        </div>
      `)

      // Create marker with error handling
      try {
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([recommendation.location.lng, recommendation.location.lat])
          .setPopup(popup)

        // Add to map
        marker.addTo(map)
        
        // Add click handler
        markerElement.addEventListener('click', () => {
          if (onRecommendationClick) {
            onRecommendationClick(recommendation)
          }
        })

        newMarkers.push(marker)
      } catch (error) {
        console.error('Error adding marker:', error)
      }
    })

    setMarkers(newMarkers)

    // Fit map to show all markers
    if (newMarkers.length > 0) {
      try {
        const bounds = new mapboxgl.LngLatBounds()
        recommendations.forEach(rec => {
          bounds.extend([rec.location.lng, rec.location.lat])
        })
        
        setTimeout(() => {
          map.fitBounds(bounds, {
            padding: 80,
            maxZoom: 13,
            center: [100.5018, 13.7563] // Keep Bangkok as center
          })
        }, 100)
      } catch (error) {
        console.error('Error fitting bounds:', error)
      }
    }

    // Cleanup on unmount or dependency change
    return () => {
      newMarkers.forEach(marker => marker.remove())
    }
  }, [map, isMapReady, recommendations, onRecommendationClick])

  const memoizedMap = useMemo(() => (
    <Map 
      className="w-full h-full" 
      onMapLoad={handleMapLoad}
    />
  ), [handleMapLoad])

  return (
    <div className={`relative ${className}`}>
      {memoizedMap}
      
      {recommendations.length > 0 && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-700">
            {recommendations.length} recommendation{recommendations.length !== 1 ? 's' : ''} found
          </p>
        </div>
      )}
    </div>
  )
}