import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { ALL_PROJECTS } from '../data/projects'
import '../pages/ProjectDetail.css'
import './Work.css'

const ALL_TAGS = Array.from(new Set(ALL_PROJECTS.flatMap((p) => p.tags))).sort()

export default function Work() {
  const [activeTags, setActiveTags] = useState(() => new Set())

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
    <div className="work-page section">
      <div className="wrap">
        <Link to="/#projects" className="back-link">← Back to home</Link>

        <p className="eyebrow">Work</p>
        <h1 className="work-heading">Everything, filterable.</h1>

        <div className="work-filter">
          <p className="work-filter-label">Filter by tag</p>
          <div className="work-filter-pills">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`filter-pill${activeTags.has(tag) ? ' is-active' : ''}`}
                aria-pressed={activeTags.has(tag)}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
            <button
              type="button"
              className="filter-pill filter-pill-clear"
              onClick={clearFilters}
              disabled={activeTags.size === 0}
            >
              Clear filters
            </button>
          </div>
        </div>

        <div className="other-grid work-grid">
          {visibleProjects.map((p) => (
            <Link to={`/work/${p.slug}`} key={p.slug} className="other-card work-card">
              <h3 className="other-title">{p.title}</h3>
              <p className="other-note">{p.subtitle ?? p.note}</p>
              <div className="other-tags">
                {p.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
