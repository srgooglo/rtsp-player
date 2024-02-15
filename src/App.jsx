import React from "react"
import ReactDOM from "react-dom/client"

import mpegts from "mpegts.js"

import "./index.css"

const App = () => {
  const streamUrl = new URLSearchParams(window.location.search).get("url")

  async function initialize() {
    const video = document.getElementById("video_player")

    const player = mpegts.createPlayer({
      type: 'flv',
      isLive: true,
      url: streamUrl,
    })

    player.attachMediaElement(video)

    player.load()

    player.play()
  }

  React.useEffect(() => {
    initialize()
  }, [])

  if (!streamUrl) {
    return <div>Stream URL not found</div>
  }

  return <div className="player">
    <video
      id="video_player"
      controls
    />
  </div>
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
