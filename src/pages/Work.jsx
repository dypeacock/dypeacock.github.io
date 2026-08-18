import { useCallback, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ALL_PROJECTS } from '../data/projects'
import { cx } from '../lib/cx'
import shared from '../styles/shared.module.css'
import tagStyles from '../styles/Tag.module.css'
import styles from './Work.module.css'

const ALL_TAGS = Array.from(new Set(ALL_PROJECTS.flatMap((p) => p.tags))).sort()

export default function Work() {
  // Seeds the initial filter from a deep link like /work?tag=PyTorch (see the
  // tag chips on Flagship/ProjectDetail) — a one-time read on mount, not a
  // synced-back-to-the-URL filter state, so ordinary toggling below still
  // just works against local state as before.
  const [searchParams] = useSearchParams()
  const initialTag = searchParams.get('tag')
  const [activeTags, setActiveTags] = useState(() => new Set(initialTag ? [initialTag] : []))

  const toggleTag = useCallback((tag) => {
    setActiveTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }, [])

  const clearFilters = useCallback(() => setActiveTags(new Set()), [])

  const visibleProjects = activeTags.size === 0
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.tags.some((t) => activeTags.has(t)))

  return (
    <div className={cx('section', shared.page)}>
      <div className="wrap">
        <Link to="/#projects" className={shared.backLink}>← Back to home</Link>

        <p className="eyebrow">Work</p>
        <h1 className={styles.heading}>Everything, filterable.</h1>

        <div className={styles.filter}>
          <p className={styles.filterLabel}>Filter by tag</p>
          <div className={tagStyles.tagList}>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                className={cx(tagStyles.tag, tagStyles.tagFilter, activeTags.has(tag) && tagStyles.tagActive)}
                aria-pressed={activeTags.has(tag)}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
            <button
              type="button"
              className={cx(tagStyles.tag, tagStyles.tagFilter, tagStyles.tagClear)}
              onClick={clearFilters}
              disabled={activeTags.size === 0}
            >
              Clear filters
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {visibleProjects.map((p) => (
            <Link to={`/work/${p.slug}`} key={p.slug} className={cx(shared.card, styles.card)}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardNote}>{p.subtitle ?? p.note}</p>
              <div className={cx(tagStyles.tagList, styles.cardTags)}>
                {p.tags.map((t) => <span key={t} className={tagStyles.tag}>{t}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
