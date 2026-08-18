import { Link } from 'react-router-dom'
import { FLAGSHIP_PROJECTS } from '../../data/projects'
import { cx } from '../../lib/cx'
import shared from '../../styles/shared.module.css'
import tagStyles from '../../styles/Tag.module.css'
import styles from './Flagship.module.css'

export default function Flagship() {
  return (
    <section id="projects" className="section section-border">
      <div className="wrap">
        <p className="eyebrow">Flagship work</p>
        <h2 className={styles.heading}>Two projects, worth a closer look.</h2>

        <div className={styles.list}>
          {FLAGSHIP_PROJECTS.map((p) => (
            <article className={cx(shared.card, styles.card)} key={p.slug}>
              <div>
                <div className={tagStyles.descriptorList}>
                    {p.about.map((about) => <p key={about} className={tagStyles.descriptor}>{about}</p>)}
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardSubhead}>{p.subtitle}</p>

                <div className={cx(shared.metric, styles.metric)}>
                  <span className={shared.metricValue}>{p.metricLabel}</span>
                  <span className={shared.metricNote}>{p.metricNote}</span>
                </div>

                <div className={cx(tagStyles.tagList, styles.stack)}>
                  {p.tags.map((tag) => (
                    <Link key={tag} to={`/work?tag=${encodeURIComponent(tag)}`} className={tagStyles.tag}>{tag}</Link>
                  ))}
                </div>
              </div>

              <div className={styles.detail}>
                  <p className={styles.detailBlock}><strong>The problem</strong><br />{p.problem}</p>
                  <div className={styles.detailBlock}>
                      <strong>What I did</strong>
                      <ul className={styles.steps}>
                          {p.approach.map((step, i) => <li key={i}>{step}</li>)}
                      </ul>
                  </div>
                  <p className={styles.detailBlock}><strong>Outcome</strong><br />{p.outcome}</p>
                <Link to={`/work/${p.slug}`} className={styles.link}>
                  Read the full case study →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <Link to="/work" className={cx(styles.link, styles.seeAll)}>
          See all work →
        </Link>
      </div>
    </section>
  )
}
