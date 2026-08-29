import { useEffect, useState } from 'react'
import { cx } from '../../lib/cx'
import styles from './Contact.module.css'

// Assembled at runtime rather than written plainly in the markup — a cheap
// deterrent against the simplest scrapers, without adding a form/backend.
const USER = 'dylanpeacock.dev'
const DOMAIN = 'gmail.com'

export default function Contact() {
  const [email, setEmail] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setEmail(`${USER}@${DOMAIN}`)
  }, [])

  const handleCopy = async () => {
    if (!email) return
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — the mailto link still works as a fallback.
    }
  }

  return (
    <section id="contact" className={cx('section', styles.contact)}>
      <div className={cx('wrap', styles.inner)}>
        <p className="eyebrow">Get in touch</p>
        <h2 className={styles.heading}>
          Looking for a graduate role.<br className={styles.brDesktop} /> Reach out, and I'll send my CV or find time to talk.
        </h2>
        <div className={styles.links}>
          <div className={styles.emailRow}>
            <a href={email ? `mailto:${email}` : undefined} className={styles.link}>
              {email || 'Loading…'}
            </a>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopy}
              aria-label="Copy email address"
              disabled={!email}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className={styles.secondary}>
            <a href="https://github.com/dypeacock" target="_blank" rel="noreferrer">GitHub</a>
            <span className={styles.dot}>·</span>
            <a href="https://uk.linkedin.com/in/dypeacock" target="_blank" rel="noreferrer">LinkedIn</a>
            {/*Might change in future if I decide to make a CV without contact details*/}
            {/*<span className={styles.dot}>·</span>*/}
            {/*<a href={cv} target="_blank" rel="noreferrer">CV</a>*/}
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={cx('wrap', styles.footerInner)}>
          <span>Dylan Peacock, {new Date().getFullYear()}</span>
          <a
            href="https://github.com/dypeacock/dypeacock.github.io"
            target="_blank"
            rel="noreferrer"
            className={styles.footerRepoLink}
          >
            Source on GitHub
          </a>
        </div>
      </footer>
    </section>
  )
}
