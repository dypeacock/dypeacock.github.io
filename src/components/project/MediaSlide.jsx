import { useEffect, useRef } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

// Renders one slide (image or video) for either the inline frame or the
// lightbox. Video playback is imperative (play()/pause() aren't real DOM
// props), so this owns the <video> ref and syncs it to `paused` itself —
// neither caller needs to know that.
export default function MediaSlide({ item, paused, className }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const prefersReducedMotion = window.matchMedia?.(REDUCED_MOTION_QUERY).matches
    if (paused || prefersReducedMotion) {
      video.pause()
    } else {
      // Autoplay can be rejected by the browser before the element has
      // focus/user-gesture context in some embedding contexts — ignore it
      // rather than surface an unhandled rejection, the poster frame is a
      // fine fallback.
      video.play?.().catch(() => {})
    }
  }, [paused, item])

  if (item.type === 'video') {
    return (
      <video
        ref={videoRef}
        className={className}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={item.alt}
      />
    )
  }

  return <img className={className} src={item.src} alt={item.alt ?? ''} />
}
