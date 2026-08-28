import { useCallback, useState } from 'react'

// Shared cycling logic behind both the inline phone/poster frame and the
// expanded lightbox — same slide set, same index/play state, just rendered
// inside different chrome. Keeping it in one hook means the two never drift
// out of sync on how "next slide" or "toggle play" actually behaves.
export function useMediaSlides(items, initialIndex = 0) {
  const count = items.length
  const [index, setIndex] = useState(Math.min(Math.max(initialIndex, 0), count - 1))
  // Only meaningful while the current slide is a video — a fresh slide
  // always starts playing, matching the ambient/autoplay feel described
  // for the inline preview.
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((i) => {
    setIndex(((i % count) + count) % count)
    setPaused(false)
  }, [count])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const togglePlay = useCallback(() => setPaused((p) => !p), [])

  return { index, current: items[index], count, goTo, next, prev, paused, togglePlay }
}
