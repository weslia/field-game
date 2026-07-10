import { useState } from 'react'

import './App.css'

import HomeView from './views/HomeView'             // 頁面跳轉程式碼
import CommanderView from './views/CommanderView'   // 指揮官功能程式碼
import AgentView from './views/AgentView'           // 特務功能程式碼
import type { AppView, Coordinate } from './types'  // 儲存頁面跳轉狀態、(x, y)座標

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

export default App
