export type AppView = 'home' | 'commander' | 'agent' // 頁面的狀態變數

export type Coordinate = { // 用來儲存
  lng: number
  lat: number
}

export type LocationState = // 特攻的定位穩定度狀態標示
  | { status: 'idle' }
  | { status: 'watching' }
  | { status: 'ready'; coordinate: Coordinate; accuracy: number }
  | { status: 'error'; message: string }