import { Link, useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getProjectBySlug } from '../data/projects'
import '../components/Flagship.css'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) return <Navigate to="/404" replace />

  // Flagship projects carry the full brief/process/implementation/outcome shape;
  // lighter "other work" projects don't yet. Render whatever a project actually
  // has and quietly omit the rest, rather than assuming every field exists.
  const brief = project.brief ?? project.note
  const hasMetric = Boolean(project.metricLabel)
  const hasAbout = Boolean(project.about?.length)
  const hasProcess = Boolean(project.process?.length)
  const hasImplementation = Boolean(project.implementation?.length)
  const hasOutcome = Boolean(project.outcome)

  return (
    <article className="project-detail section">
      <div className="wrap">
        <Link to="/work" className="back-link">← Back to all work</Link>

        {hasAbout && (
          <div className="about-tags">
            {project.about.map((about) => <p className="about-tag">{about}</p>)}
          </div>
        )}
        <h1 className="pd-title">{project.title}</h1>
        {project.subtitle && <p className="pd-subtitle">{project.subtitle}</p>}

        {hasMetric && (
          <div className="pd-metric">
            <span className="metric-value">{project.metricLabel}</span>
            <span className="metric-note">{project.metricNote}</span>
          </div>
        )}

        <div className="pd-stack">
          {project.tags.map((tag) => (
              <span key={tag} className="stack-pill">{tag}</span>
          ))}
        </div>

        <div className="pd-body">
          <section className="pd-section">
            <h2 className="pd-section-title">Brief</h2>
            <p>{brief}</p>
          </section>

          {hasProcess && (
            <section className="pd-section">
              <h2 className="pd-section-title">Process</h2>
              <ul className="pd-list">
                {project.process.map((step, i) => <li key={i}>{step}</li>)}
              </ul>
            </section>
          )}

          {hasImplementation && (
            <section className="pd-section">
              <h2 className="pd-section-title">Implementation</h2>
              <ul className="pd-list">
                {project.implementation.map((step, i) => <li key={i}>{step}</li>)}
              </ul>
            </section>
          )}

          {hasOutcome && (
            <section className="pd-section">
              <h2 className="pd-section-title">Outcome</h2>
              <p>{project.outcome}</p>
            </section>
          )}
        </div>

        <div className="pd-footer-nav">
          <Link to="/work" className="back-link">← Back to all work</Link>
          <Link to="/#contact" className="back-link">Get in touch →</Link>
        </div>
      </div>
    </article>
  )
}
