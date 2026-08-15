import { Link } from 'react-router-dom'
import { FLAGSHIP_PROJECTS } from '../data/projects'
import './Flagship.css'

export default function Flagship() {
  return (
    <section id="projects" className="section section-border">
      <div className="wrap">
        <p className="eyebrow">Flagship work</p>
        <h2 className="flagship-heading">Two projects, worth a closer look.</h2>

        <div className="flagship-list">
          {FLAGSHIP_PROJECTS.map((p) => (
            <article className="flagship-card" key={p.slug}>
              <div className="flagship-meta">
                <p className="flagship-tag">{p.tag}</p>
                <h3 className="flagship-title">{p.title}</h3>
                <p className="flagship-subtitle">{p.subtitle}</p>

                <div className="flagship-metric">
                  <span className="metric-value">{p.metricLabel}</span>
                  <span className="metric-note">{p.metricNote}</span>
                </div>

                <div className="flagship-stack">
                  {p.stack.map((s) => (
                    <span key={s} className="stack-pill">{s}</span>
                  ))}
                </div>
              </div>

              <div className="flagship-detail">
                <p className="detail-block">{p.hook}</p>
                <ul className="detail-list">
                  {p.process.slice(0, 2).map((step, i) => <li key={i}>{step}</li>)}
                </ul>
                <Link to={`/work/${p.slug}`} className="flagship-link">
                  Read the full case study →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
