import { ArrowLeft, Navigation } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import './App.css'

import HomeView from './views/HomeView'
import CommanderMap from './components/CommanderMap'
import type { AppView, Coordinate, LocationState } from './types'
import { formatDistance, getTargetNavigation } from './utils/geo'

// const MOCK_TARGET: Coordinate = { // 固定目標台北101(用於驗證羅盤計算)
//   lng: 121.5645,
//   lat: 25.0339,
// }

function App() {
  const [view, setView] = useState<AppView>('home')
  const [target, setTarget] = useState<Coordinate | null>(null)

  if (view === 'commander') {
    return <CommanderView target={target} onTargetChange={setTarget} onBack={() => setView('home')} />
  }

  if (view === 'agent') {
    return <AgentView target={target} onBack={() => setView('home')} />
  }

  return <HomeView onSelectView={setView} />
}



type ViewProps = {
  onBack: () => void
}

type CommanderViewProps = ViewProps & {
  target: Coordinate | null
  onTargetChange: (target: Coordinate) => void
}

type AgentViewProps = ViewProps & {
  target: Coordinate | null
}

// 指揮官頁面
function CommanderView({ target, onTargetChange, onBack }: CommanderViewProps) {

  return (
    <main className="app-shell">
      <header className="page-header">
        <button className="ghost-action" type="button" onClick={onBack} aria-label="回到首頁">
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="eyebrow">Commander</p>
          <h1>指揮官控制台</h1>
        </div>
      </header>

      <section className="workspace">
        <CommanderMap target={target} onTargetChange={onTargetChange} />

        <aside className="side-panel">
          <h2>活動狀態</h2>
          <p>點擊地圖即可設定目前任務目標點。</p>

          <div className="status-block">
            <h3>目標點</h3>
            {target ? (
              <dl className="coordinate-list">
                <div>
                  <dt>經度</dt>
                  <dd>{target.lng.toFixed(6)}</dd>
                </div>
                <div>
                  <dt>緯度</dt>
                  <dd>{target.lat.toFixed(6)}</dd>
                </div>
              </dl>
            ) : (
              <p>尚未設定目標點。</p>
            )}
          </div>
        </aside>
      </section>
    </main>
  )
}



// 特工頁面
function AgentView({ target, onBack }: AgentViewProps) {
  const [locationState, setLocationState] = useState<LocationState>({ status: 'idle' })
  const watchIdRef = useRef<number | null>(null)

  function startLocationWatch() {
    if (!navigator.geolocation) {
      setLocationState({
        status: 'error',
        message: '這個瀏覽器不支援定位功能。',
      })
      return
    }

    setLocationState({ status: 'watching' })

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        setLocationState({
          status: 'ready',
          coordinate: {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          },
          accuracy: position.coords.accuracy,
        })
      },
      (error) => {
        setLocationState({
          status: 'error',
          message: getGeolocationErrorMessage(error),
        })
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      },
    )
  }

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current)
      }
    }
  }, [])

  const targetNavigation =
    locationState.status === 'ready' && target
      ? getTargetNavigation(locationState.coordinate, target)
      : null

  return (
    <main className="app-shell">
      <header className="page-header">
        <button className="ghost-action" type="button" onClick={onBack} aria-label="回到首頁">
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="eyebrow">Agent</p>
          <h1>特工任務介面</h1>
        </div>
      </header>

      <section className="agent-panel">
        <div className="compass-placeholder">
          <Navigation
            size={56}
            style={{
              transform: targetNavigation ? `rotate(${targetNavigation.bearing}deg)` : undefined,
            }}
          />
        </div>
        <h2>{targetNavigation ? '目標已鎖定' : target ? '等待定位' : '等待目標點'}</h2>
        <p>
          {targetNavigation
            ? `距離目標約 ${formatDistance(targetNavigation.distanceMeters)}，方位 ${Math.round(
              targetNavigation.bearing,
            )} 度。`
            : target
              ? '啟用定位後，這裡會顯示你的目前座標、GPS 精度與目標方向。'
              : '請先由指揮官在地圖上設定目標點。'}
        </p>

        <button className="primary-action" type="button" onClick={startLocationWatch}>
          啟用定位
        </button>

        <LocationStatus locationState={locationState} />
      </section>
    </main>
  )
}

// 特工的定位功能運作
type LocationStatusProps = {
  locationState: LocationState
}
function LocationStatus({ locationState }: LocationStatusProps) {
  if (locationState.status === 'idle') {
    return <p className="muted-text">尚未啟用定位。</p>
  }

  if (locationState.status === 'watching') {
    return <p className="muted-text">正在取得定位...</p>
  }

  if (locationState.status === 'error') {
    return <p className="error-text">{locationState.message}</p>
  }

  return (
    <dl className="coordinate-list agent-location">
      <div>
        <dt>經度</dt>
        <dd>{locationState.coordinate.lng.toFixed(6)}</dd>
      </div>
      <div>
        <dt>緯度</dt>
        <dd>{locationState.coordinate.lat.toFixed(6)}</dd>
      </div>
      <div>
        <dt>GPS 精度</dt>
        <dd>{Math.round(locationState.accuracy)} 公尺</dd>
      </div>
    </dl>
  )
}
function getGeolocationErrorMessage(error: GeolocationPositionError) {
  if (error.code === error.PERMISSION_DENIED) {
    return '定位權限被拒絕，請到瀏覽器設定允許定位。'
  }

  if (error.code === error.POSITION_UNAVAILABLE) {
    return '目前無法取得定位，請確認 GPS 或網路狀態。'
  }

  if (error.code === error.TIMEOUT) {
    return '定位逾時，請移動到戶外或訊號較好的位置再試一次。'
  }

  return '取得定位時發生未知錯誤。'
}

export default App