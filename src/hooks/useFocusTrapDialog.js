import { useEffect } from 'react'

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

// Shared plumbing for a portal-rendered modal overlay: on mount it moves
// focus in (to initialFocusRef if given, else the container itself) and
// locks body scroll; on unmount it restores focus to whatever opened it.
// While mounted, Escape calls onClose and Tab is trapped inside the
// container. Extracted from MediaLightbox once FilterPanel needed the same
// ~20 lines rather than a second hand-rolled copy.
//
// `onKeyDown`, if given, runs first on every keydown — for overlay-specific
// keys (MediaLightbox's arrow/space handling) — before the Escape/Tab
// handling below, which always applies regardless.
export function useFocusTrapDialog(containerRef, onClose, { initialFocusRef, onKeyDown } = {}) {
  useEffect(() => {
    const previouslyFocused = document.activeElement
    ;(initialFocusRef?.current ?? containerRef.current)?.focus()
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      onKeyDown?.(event)

      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key === 'Tab') {
        const focusable = containerRef.current?.querySelectorAll(FOCUSABLE_SELECTOR)
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onKeyDown])
}
