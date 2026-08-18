import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Contact from './components/Contact'
import Home from './pages/Home'
import Work from './pages/Work'
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

// React Router's client-side navigation (via <Link>) doesn't trigger the
// browser's native scroll-to-anchor behavior, since no real page load occurs.
// This restores that behavior after route/hash changes, e.g. a Link like
// `to="/#projects"` navigating from a different route.
function useHashScroll() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [hash, pathname])
}

export default function App() {
  const [loading, setLoading] = useState(true)
  useHashScroll()

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
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Contact />
    </div>
  )
}
