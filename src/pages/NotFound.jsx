import { Link } from 'react-router-dom'
import { cx } from '../lib/cx'
import shared from '../styles/shared.module.css'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={cx('section', styles.notFound)}>
      <div className={cx('wrap', styles.inner)}>
        <h1 className={styles.headingAccent}>404</h1>
        <h1 className={styles.heading}>Nothing built here yet.</h1>
        <p className={styles.subhead}>
          This page doesn't exist, or it moved. Head back to the homepage or browse projects on the work page.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={cx(shared.btn, shared.btnPrimary)}>Back to the homepage</Link>
          <Link to="/work" className={cx(shared.btn, shared.btnGhost)}>See all projects</Link>
        </div>
      </div>
    </section>
  )
}
