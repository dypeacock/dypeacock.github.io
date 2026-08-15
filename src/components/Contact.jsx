import { useEffect, useState } from 'react'
import './Contact.css'

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
    <section id="contact" className="section contact">
      <div className="wrap contact-inner">
        <p className="eyebrow">Get in touch</p>
        <h2 className="contact-heading">
          Open to graduate roles, and to hearing<br className="br-desktop" /> what you're building.
        </h2>
        <div className="contact-links">
          <div className="contact-email-row">
            <a href={email ? `mailto:${email}` : undefined} className="contact-link">
              {email || 'Loading…'}
            </a>
            <button
              type="button"
              className="copy-btn"
              onClick={handleCopy}
              aria-label="Copy email address"
              disabled={!email}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="contact-secondary">
            <a href="https://github.com/dypeacock" target="_blank" rel="noreferrer">GitHub</a>
            <span className="dot">·</span>
            <a href="https://uk.linkedin.com/in/dypeacock" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="wrap footer-inner">
          <span>Dylan Peacock, {new Date().getFullYear()}</span>
          <a
            href="https://github.com/dypeacock/dypeacock.github.io"
            target="_blank"
            rel="noreferrer"
            className="footer-repo-link"
          >
            Source on GitHub
          </a>
        </div>
      </footer>
    </section>
  )
}
