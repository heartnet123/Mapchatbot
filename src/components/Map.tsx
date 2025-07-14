'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface MapProps {
  className?: string
  onMapLoad?: (map: mapboxgl.Map) => void
}

export default function Map({ className = '', onMapLoad }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || map.current || isInitialized) return

    // Set Mapbox access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

    if (!mapboxgl.accessToken) {
      console.error('Mapbox access token is not set')
      return
    }

    setIsInitialized(true)

    try {
      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [100.5018, 13.7563], // Bangkok coordinates
        zoom: 11, // Focused on Bangkok city area
        pitch: 0, // Flatter view for better readability
        bearing: 0,
        antialias: true,
        preserveDrawingBuffer: true
      })
    } catch (error) {
      console.error('Error initializing map:', error)
      setIsInitialized(false)
      return
    }

    // Add controls after map is ready
    const addControls = () => {
      if (!map.current) return
      
      try {
        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

        // Add geolocate control
        map.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
          }),
          'top-right'
        )
      } catch (error) {
        console.error('Error adding controls:', error)
      }
    }

    // Handle map load
    map.current.on('load', () => {
      setMapLoaded(true)
      addControls()
      if (onMapLoad && map.current) {
        // Use setTimeout to ensure map is fully ready
        setTimeout(() => {
          if (map.current) {
            onMapLoad(map.current)
          }
        }, 100)
      }
    })

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
        setIsInitialized(false)
        setMapLoaded(false)
      }
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg overflow-hidden"
        style={{ minHeight: '400px' }}
      />
      
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-white">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}