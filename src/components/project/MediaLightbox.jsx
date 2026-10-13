import { useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cx } from '../../lib/cx'
import { useFocusTrapDialog } from '../../hooks/useFocusTrapDialog'
import { useMediaSlides } from './useMediaSlides'
import MediaSlide from './MediaSlide'
import { ChevronIcon, CloseIcon, PlayIcon, PauseIcon } from './Icons'
import styles from './MediaLightbox.module.css'

// Expanded overlay for a project's media. Deliberately reuses useMediaSlides
// rather than tracking its own index — it's the same slide set as the inline
// frame, just seeded to whichever slide was showing when it was opened.
export default function MediaLightbox({ items, initialIndex, title, variant, onClose }) {
  const { index, current, count, next, prev, goTo, paused, togglePlay } = useMediaSlides(items, initialIndex)
  const dialogRef = useRef(null)

  const handleSlideKeys = useCallback((event) => {
    if (count > 1 && event.key === 'ArrowRight') next()
    if (count > 1 && event.key === 'ArrowLeft') prev()
    if (event.key === ' ' && current.type === 'video') {
      event.preventDefault()
      togglePlay()
    }
  }, [count, next, prev, current, togglePlay])

  useFocusTrapDialog(dialogRef, onClose, { onKeyDown: handleSlideKeys })

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <div className={styles.stage}>
          {count > 1 && (
            <button type="button" className={cx(styles.navBtn, styles.navPrev)} onClick={prev} aria-label="Previous">
              <ChevronIcon direction="left" />
            </button>
          )}

          <MediaSlide
            item={current}
            paused={paused}
            className={cx(styles.media, variant === 'poster' && styles.posterMedia)}
          />

          {count > 1 && (
            <button type="button" className={cx(styles.navBtn, styles.navNext)} onClick={next} aria-label="Next">
              <ChevronIcon direction="right" />
            </button>
          )}
        </div>

        {/* Below the media, not floated on top of it — the screen content
            being previewed is arbitrary and a fixed overlay position could
            land on top of anything the app itself is showing there. */}
        {(current.type === 'video' || count > 1) && (
          <div className={styles.controls}>
            {current.type === 'video' && (
              <button
                type="button"
                className={styles.playPause}
                onClick={togglePlay}
                aria-label={paused ? 'Play recording' : 'Pause recording'}
              >
                {paused ? <PlayIcon /> : <PauseIcon />}
              </button>
            )}

            {count > 1 && (
              <div className={styles.dots} role="tablist" aria-label="Slides">
                {items.map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Go to slide ${i + 1} of ${count}`}
                    className={cx(styles.dot, i === index && styles.dotActive)}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
