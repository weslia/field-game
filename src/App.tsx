import { useState } from 'react'

import './App.css'

import HomeView from './views/HomeView'
import CommanderView from './views/CommanderView'
import AgentView from './views/AgentView'
import type { AppView, Coordinate } from './types'

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
