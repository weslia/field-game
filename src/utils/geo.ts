import type { Coordinate } from '../types'

export function getTargetNavigation(current: Coordinate, target: Coordinate) {
  const distanceMeters = getDistanceMeters(current, target)
  const bearing = getBearingDegrees(current, target)

  return {
    distanceMeters,
    bearing,
  }
}
function getDistanceMeters(from: Coordinate, to: Coordinate) {
  const earthRadiusMeters = 6371000
  const fromLat = toRadians(from.lat)
  const toLat = toRadians(to.lat)
  const deltaLat = toRadians(to.lat - from.lat)
  const deltaLng = toRadians(to.lng - from.lng)

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return earthRadiusMeters * c
}
function getBearingDegrees(from: Coordinate, to: Coordinate) {
  const fromLat = toRadians(from.lat)
  const toLat = toRadians(to.lat)
  const deltaLng = toRadians(to.lng - from.lng)

  const y = Math.sin(deltaLng) * Math.cos(toLat)
  const x =
    Math.cos(fromLat) * Math.sin(toLat) -
    Math.sin(fromLat) * Math.cos(toLat) * Math.cos(deltaLng)

  return (toDegrees(Math.atan2(y, x)) + 360) % 360
}
function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180
}
function toDegrees(radians: number) {
  return (radians * 180) / Math.PI
}
export function formatDistance(distanceMeters: number) {
  if (distanceMeters >= 1000) {
    return `${(distanceMeters / 1000).toFixed(2)} 公里`
  }

  return `${Math.round(distanceMeters)} 公尺`
}