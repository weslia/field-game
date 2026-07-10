# Field Game

戶外陣營大地遊戲平台原型。這個專案目標是協助團康活動進行，讓指揮官可以在地圖上設定集結目標，讓特工透過手機定位取得自己的座標，並計算前往目標點的距離與方位。

## Demo

GitHub Pages:

https://weslia.github.io/field-game/

## Current Features

- 首頁角色選擇：指揮官 / 特工
- 指揮官控制台：MapLibre 地圖顯示
- 指揮官可點擊地圖設定目標點
- 特工端可啟用瀏覽器 GPS 定位
- 特工端可計算與目標點的距離
- 特工端可計算目標方位角
- GitHub Actions 自動部署到 GitHub Pages

## Tech Stack

- Vite
- React
- TypeScript
- MapLibre GL JS
- Supabase JavaScript client
- Lucide React
- GitHub Pages
- GitHub Actions

## Project Structure

```txt
src/
  components/
    CommanderMap.tsx
  utils/
    geo.ts
  views/
    HomeView.tsx
  App.css
  App.tsx
  index.css
  main.tsx
  types.ts
```

## Local Development

Install dependencies:

```powershell
npm.cmd install
```

Start the development server:

```powershell
npm.cmd run dev
```

Build for production:

```powershell
npm.cmd run build
```

Run lint:

```powershell
npm.cmd run lint
```

Preview the production build locally:

```powershell
npm.cmd run preview
```

## Deployment

This project deploys to GitHub Pages through GitHub Actions.

Important Vite setting:

```ts
base: '/field-game/'
```

The value must match the GitHub repository name because the site is deployed under:

```txt
https://weslia.github.io/field-game/
```

## Development Notes

- GPS features require browser location permission.
- `localhost` can use Geolocation during development.
- A deployed production site must use HTTPS for Geolocation.
- Current target sharing is local React state only. It works within the same browser session but is not yet synchronized between different devices.
- The next backend step is to connect Supabase for activity rooms, shared targets, and realtime agent locations.

## Next Milestones

- Split `CommanderView` and `AgentView` into separate files.
- Add activity room code flow.
- Add Supabase environment configuration.
- Store target points in Supabase.
- Sync target updates through Supabase Realtime.
- Send agent location updates to the commander view.
