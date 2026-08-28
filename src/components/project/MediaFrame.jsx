import { useState } from 'react'
import { cx } from '../../lib/cx'
import { useMediaSlides } from './useMediaSlides'
import MediaSlide from './MediaSlide'
import MediaLightbox from './MediaLightbox'
import { ChevronIcon, ExpandIcon } from './Icons'
import styles from './MediaFrame.module.css'

// Inline preview for a project's media — phone-bezel or poster chrome around
// the same underlying slide viewer. The two types differ only in the frame
// (`isPhone`); cycling, the expand-to-lightbox trigger, and the dots/arrows
// are identical either way, and simply don't render when there's only one
// slide (poster's usual case).
export default function MediaFrame({ media, title }) {
  const { items, type } = media
  const { index, current, count, next, prev, goTo, paused } = useMediaSlides(items)
  const [open, setOpen] = useState(false)
  const isPhone = type === 'phone'

  const handleTriggerKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
    }
  }

  return (
    <div className={styles.wrap}>
      <div
        className={cx(styles.frame, isPhone ? styles.phone : styles.poster)}
        role="button"
        tabIndex={0}
        aria-label={title ? `View ${title} media, expanded` : 'View expanded media'}
        onClick={() => setOpen(true)}
        onKeyDown={handleTriggerKeyDown}
      >
        {isPhone && <span className={styles.notch} aria-hidden="true" />}

        <div className={styles.screen}>
          <MediaSlide item={current} paused={paused} className={isPhone ? styles.media : styles.posterMedia} />
        </div>

        <span className={styles.expandBadge} aria-hidden="true">
          <ExpandIcon />
        </span>

        {count > 1 && (
          <>
            <button
              type="button"
              className={cx(styles.navBtn, styles.navPrev)}
              onClick={(event) => { event.stopPropagation(); prev() }}
              aria-label="Previous"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              className={cx(styles.navBtn, styles.navNext)}
              onClick={(event) => { event.stopPropagation(); next() }}
              aria-label="Next"
            >
              <ChevronIcon direction="right" />
            </button>
          </>
        )}
      </div>

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

      {open && (
        <MediaLightbox items={items} initialIndex={index} title={title} variant={type} onClose={() => setOpen(false)} />
      )}
    </div>
  )
}
