import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Contact from './components/Contact'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'

function SkeletonScreen({ visible }) {
  return (
    <div
      className="skeleton-screen"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={!visible}
    >
      <span className="skeleton-mark">DP</span>
      <div className="skeleton-bar" />
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Keep this brief and capped — it exists to smooth over slow asset loads
    // (fonts, images) on a first visit, not to add artificial delay.
    let done = false
    const finish = () => {
      if (done) return
      done = true
      setLoading(false)
    }
    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish)
    }
    const fallback = setTimeout(finish, 1200)
    return () => {
      window.removeEventListener('load', finish)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <div id="top">
      <SkeletonScreen visible={loading} />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Contact />
    </div>
  )
}
