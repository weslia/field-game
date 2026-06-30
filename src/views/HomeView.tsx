import { Map, Navigation } from 'lucide-react'

import type { AppView } from '../types'

// 用來紀錄終端跳轉至哪個頁面
type HomeViewProps = {
  onSelectView: (view: AppView) => void
}

// 首頁
function HomeView({ onSelectView }: HomeViewProps) {
  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Field Game</p>
          <h1>這是一個陣營大地遊戲</h1>
          <p className="hero-description">
            建立活動房間、設定目標點，讓指揮官掌握特工位置，讓特工依照方向與距離前進。
          </p>

          <div className="role-actions">
            <button className="primary-action" type="button" onClick={() => onSelectView('commander')}>
              <Map size={20} />
              我是指揮官
            </button>

            <button className="secondary-action" type="button" onClick={() => onSelectView('agent')}>
              <Navigation size={20} />
              我是特工
            </button>
          </div>
        </div>
      </section>

      <section className="feature-grid" aria-label="核心功能">
        <article className="feature-card">
          <Map size={24} />
          <h2>指揮官</h2>
          <p>指揮官能查看地圖、設定特工集結目標點，並即時查看特工們的位置。</p>
        </article>

        <article className="feature-card">
          <Navigation size={24} />
          <h2>特工</h2>
          <p>特工端顯示羅盤指向集結目標方向、距離與目前是否定位穩定。</p>
        </article>
      </section>
    </main>
  )
}

export default HomeView