import maplibregl from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Coordinate } from '../types'

// 指揮專的地圖運作
type CommanderMapProps = {
  target: Coordinate | null
  onTargetChange: (target: Coordinate) => void
}
function CommanderMap({ target, onTargetChange }: CommanderMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)              // 用於保留地圖實例
  const targetMarkerRef = useRef<maplibregl.Marker | null>(null)  // 用於儲存指揮官設定的集結目標

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return
    }

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [121.5654, 25.033],
      zoom: 13,
    })

    map.addControl(new maplibregl.NavigationControl(), 'top-right') // 建立紅色集結目標marker

    map.on('click', (event) => {
      onTargetChange({
        lng: event.lngLat.lng,
        lat: event.lngLat.lat,
      })
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      targetMarkerRef.current = null
    }
  }, [onTargetChange])

  useEffect(() => {
    if (!mapRef.current) {
      return
    }

    if (!target) {
      targetMarkerRef.current?.remove()
      targetMarkerRef.current = null
      return
    }

    if (!targetMarkerRef.current) {
      targetMarkerRef.current = new maplibregl.Marker({ color: '#ef4444' })
        .setLngLat([target.lng, target.lat])
        .addTo(mapRef.current)
      return
    }

    targetMarkerRef.current.setLngLat([target.lng, target.lat])
  }, [target])

  return <div className="commander-map" ref={mapContainerRef} aria-label="指揮官地圖" />
}

export default CommanderMap