import { useCallback, useState } from 'react'
import { cx } from '../../lib/cx'
import tagStyles from '../../styles/Tag.module.css'
import FilterPanel from './FilterPanel'
import styles from './FilterBar.module.css'

// Trigger + echoed selections for the Work page's tag filter. The full
// ALL_TAGS list only ever lives inside FilterPanel now — this bar just
// shows a count badge and the currently active tags as removable pills,
// so people always see what's applied without opening anything.
export default function FilterBar({ allTags, activeTags, onToggleTag, onClear }) {
  const [panelOpen, setPanelOpen] = useState(false)

  const openPanel = useCallback(() => setPanelOpen(true), [])
  const closePanel = useCallback(() => setPanelOpen(false), [])

  // Sorted (allTags is already sorted) rather than Set insertion order, so
  // the echoed row doesn't reshuffle as filters are toggled on and off.
  const selectedTags = allTags.filter((tag) => activeTags.has(tag))

  return (
    <div className={styles.bar}>
      <div className={styles.triggerWrap}>
        <button
          type="button"
          className={cx(styles.trigger, panelOpen && styles.triggerOpen)}
          aria-haspopup="dialog"
          aria-expanded={panelOpen}
          onClick={openPanel}
        >
          Filter by tag
          {activeTags.size > 0 && <span className={styles.badge}>{activeTags.size}</span>}
        </button>

        {panelOpen && (
          <FilterPanel
            allTags={allTags}
            activeTags={activeTags}
            onToggleTag={onToggleTag}
            onClear={onClear}
            onClose={closePanel}
          />
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className={cx(tagStyles.tagList, styles.selectedList)}>
          {selectedTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={cx(tagStyles.tag, tagStyles.tagActive, styles.selectedPill)}
              onClick={() => onToggleTag(tag)}
              aria-label={`Remove ${tag} filter`}
            >
              {tag}
              <span className={styles.removeIcon} aria-hidden="true">×</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
