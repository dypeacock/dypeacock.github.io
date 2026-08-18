import { Link, useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getProjectBySlug, getNextProject } from '../data/projects'
import { cx } from '../lib/cx'
import shared from '../styles/shared.module.css'
import tagStyles from '../styles/Tag.module.css'
import styles from './ProjectDetail.module.css'

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
  const nextProject = getNextProject(slug)

  return (
    <article className={cx('section', shared.page)}>
      <div className="wrap">
        <Link to="/work" className={shared.backLink}>← Back to all work</Link>

        {hasAbout && (
          <div className={tagStyles.descriptorList}>
            {project.about.map((about) => <p key={about} className={tagStyles.descriptor}>{about}</p>)}
          </div>
        )}
        <h1 className={styles.heading}>{project.title}</h1>
        {project.subtitle && <p className={styles.subhead}>{project.subtitle}</p>}

        {hasMetric && (
          <div className={cx(shared.metric, styles.metric)}>
            <span className={shared.metricValue}>{project.metricLabel}</span>
            <span className={shared.metricNote}>{project.metricNote}</span>
          </div>
        )}

        <div className={cx(tagStyles.tagList, styles.stack)}>
          {project.tags.map((tag) => (
              <Link key={tag} to={`/work?tag=${encodeURIComponent(tag)}`} className={tagStyles.tag}>{tag}</Link>
          ))}
        </div>

        <div className={styles.body}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Brief</h2>
            <p>{brief}</p>
          </section>

          {hasProcess && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Process</h2>
              <ul className={styles.list}>
                {project.process.map((step, i) => <li key={i}>{step}</li>)}
              </ul>
            </section>
          )}

          {hasImplementation && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Implementation</h2>
              <ul className={styles.list}>
                {project.implementation.map((step, i) => <li key={i}>{step}</li>)}
              </ul>
            </section>
          )}

          {hasOutcome && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Outcome</h2>
              <p>{project.outcome}</p>
            </section>
          )}
        </div>

        <div className={styles.footerNav}>
          <Link to="/work" className={shared.backLink}>← Back to all work</Link>
          {nextProject && (
            <Link to={`/work/${nextProject.slug}`} className={shared.backLink}>
              {nextProject.title} →
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
