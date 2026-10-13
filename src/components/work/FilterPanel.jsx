import { useMemo, useRef, useState } from 'react'
import { cx } from '../../lib/cx'
import { useFocusTrapDialog } from '../../hooks/useFocusTrapDialog'
import tagStyles from '../../styles/Tag.module.css'
import styles from './FilterBar.module.css'

// The Filter trigger's popover (desktop) / bottom sheet (mobile) — same
// component either way, see FilterBar.module.css for the responsive
// positioning split. Tag clicks apply immediately and the panel stays open,
// so picking several tags in a row doesn't mean reopening each time; it only
// closes on Escape, an outside click, or Done/Close.
//
// Not portaled, unlike MediaLightbox: the desktop popover's `.panel` is
// `position: absolute` anchored to FilterBar's `.triggerWrap`, which only
// works while it's an actual DOM descendant of that wrapper. The mobile
// `.panel`/`.backdrop` switch to `position: fixed`, which still pins to the
// viewport from here since nothing between this and the page root sets a
// transform/filter that would create a new containing block.
//
// Backdrop and panel are siblings, not nested — `.backdrop` is itself
// `position: fixed`, so nesting `.panel` inside it would make the backdrop
// (a full-viewport box) the containing block for `.panel`'s `position:
// absolute`, instead of `.triggerWrap`, and the anchoring would break.
export default function FilterPanel({ allTags, activeTags, onToggleTag, onClear, onClose }) {
  const [query, setQuery] = useState('')
  const panelRef = useRef(null)

  useFocusTrapDialog(panelRef, onClose)

  const visibleTags = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allTags
    return allTags.filter((tag) => tag.toLowerCase().includes(q))
  }, [allTags, query])

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />

      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Filter projects"
        tabIndex={-1}
        ref={panelRef}
      >
        <input
          type="search"
          className={styles.search}
          placeholder="Search tags…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search tags"
        />

        <div className={cx(tagStyles.tagList, styles.panelTags)}>
          {visibleTags.length === 0 && (
            <p className={styles.noResults}>No tags match &ldquo;{query}&rdquo;</p>
          )}
          {visibleTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={cx(tagStyles.tag, tagStyles.tagFilter, activeTags.has(tag) && tagStyles.tagActive)}
              aria-pressed={activeTags.has(tag)}
              onClick={() => onToggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className={styles.panelFooter}>
          <button
            type="button"
            className={cx(tagStyles.tag, tagStyles.tagFilter, tagStyles.tagClear)}
            onClick={onClear}
            disabled={activeTags.size === 0}
          >
            Clear filters
          </button>
          <button type="button" className={styles.done} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </>
  )
}
