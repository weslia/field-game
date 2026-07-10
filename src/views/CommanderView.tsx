import { ArrowLeft } from 'lucide-react'

import CommanderMap from '../components/CommanderMap'
import type { Coordinate } from '../types'

type CommanderViewProps = {
  target: Coordinate | null
  onTargetChange: (target: Coordinate) => void
  onBack: () => void
}

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

export default CommanderView
