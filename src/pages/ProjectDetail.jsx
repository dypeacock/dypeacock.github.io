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

  return (
    <article className="project-detail section">
      <div className="wrap">
        <Link to="/#projects" className="back-link">← Back to work</Link>

        <div className="flagship-tags">
          {project.tags.map((tag) => <p className="flagship-tag">{tag}</p>)}
        </div>
        <h1 className="pd-title">{project.title}</h1>
        <p className="pd-subtitle">{project.subtitle}</p>

        <div className="pd-metric">
          <span className="metric-value">{project.metricLabel}</span>
          <span className="metric-note">{project.metricNote}</span>
        </div>

        <div className="pd-stack">
          {project.stack.map((s) => (
            <span key={s} className="stack-pill">{s}</span>
          ))}
        </div>

        <div className="pd-body">
          <section className="pd-section">
            <h2 className="pd-section-title">Brief</h2>
            <p>{project.brief}</p>
          </section>

          <section className="pd-section">
            <h2 className="pd-section-title">Process</h2>
            <ul className="pd-list">
              {project.process.map((step, i) => <li key={i}>{step}</li>)}
            </ul>
          </section>

          <section className="pd-section">
            <h2 className="pd-section-title">Implementation</h2>
            <ul className="pd-list">
              {project.implementation.map((step, i) => <li key={i}>{step}</li>)}
            </ul>
          </section>

          <section className="pd-section">
            <h2 className="pd-section-title">Outcome</h2>
            <p>{project.outcome}</p>
          </section>
        </div>

        <div className="pd-footer-nav">
          <Link to="/#projects" className="back-link">← Back to work</Link>
          <Link to="/#contact" className="back-link">Get in touch →</Link>
        </div>
      </div>
    </article>
  )
}
