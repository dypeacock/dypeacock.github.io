import { Link } from 'react-router-dom'
import { cx } from '../lib/cx'
import shared from '../styles/shared.module.css'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={cx('section', styles.notFound)}>
      <div className={cx('wrap', styles.inner)}>
        <p className="eyebrow">404</p>
        <h1 className={styles.heading}>Nothing built here yet.</h1>
        <p className={styles.subhead}>
          This page doesn't exist — or it moved. Head back to the work you were
          probably looking for.
        </p>
        <Link to="/" className={cx(shared.btn, shared.btnPrimary, styles.cta)}>Back to the homepage</Link>
      </div>
    </section>
  )
}
