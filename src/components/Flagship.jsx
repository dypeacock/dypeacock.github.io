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
                <div className="about-tags">
                    {p.about.map((about) => <p className="about-tag">{about}</p>)}
                </div>
                <h3 className="flagship-title">{p.title}</h3>
                <p className="flagship-subtitle">{p.subtitle}</p>

                <div className="flagship-metric">
                  <span className="metric-value">{p.metricLabel}</span>
                  <span className="metric-note">{p.metricNote}</span>
                </div>

                <div className="flagship-stack">
                  {p.tags.map((tag) => (
                    <span key={tag} className="stack-pill">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="flagship-detail">
                  <p className="detail-block"><strong>The problem</strong><br />{p.problem}</p>
                  <div className="detail-block">
                      <strong>What I did</strong>
                      <ul className="detail-list">
                          {p.approach.map((step, i) => <li key={i}>{step}</li>)}
                      </ul>
                  </div>
                  <p className="detail-block"><strong>Outcome</strong><br />{p.outcome}</p>
                <Link to={`/work/${p.slug}`} className="flagship-link">
                  Read the full case study →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <Link to="/work" className="flagship-link flagship-see-all">
          See all work →
        </Link>
      </div>
    </section>
  )
}
