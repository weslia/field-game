import { useState } from 'react'

import './App.css'

import HomeView from './views/HomeView'
import CommanderView from './views/CommanderView'
import AgentView from './views/AgentView'
import type { ActivitySession, AppView, Coordinate } from './types'

function generateSessionCode() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const numbers = '23456789'
  const pool = letters + numbers

  return Array.from({ length: 6 }, () => pool[Math.floor(Math.random() * pool.length)]).join('')
}

function App() {
    const [view, setView] = useState<AppView>('home')
    const [target, setTarget] = useState<Coordinate | null>(null)
    const [session, setSession] = useState<ActivitySession | null>(null)

    function createSession() {
        setSession({
            code: generateSessionCode(),
        })
    }

    function joinSession(code: string) {
        setSession({
            code: code.trim().toUpperCase(),
        })
    }

    if (view === 'commander') {
        return (
            <CommanderView
                session={session}
                target={target}
                onCreateSession={createSession}
                onTargetChange={setTarget}
                onBack={() => setView('home')}
            />
        )
    }

    if (view === 'agent') {
        return (
            <AgentView
                session={session}
                target={target}
                onJoinSession={joinSession}
                onBack={() => setView('home')}
            />
        )
    }

    return <HomeView onSelectView={setView} />
}

export default App
