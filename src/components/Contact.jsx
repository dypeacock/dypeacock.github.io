import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="wrap contact-inner">
        <p className="eyebrow">Get in touch</p>
        <h2 className="contact-heading">
          Open to graduate roles, and to hearing<br className="br-desktop" /> what you're building.
        </h2>
        <div className="contact-links">
          <a href="mailto:dylanpeacock.dev@gmail.com" className="contact-link">
            dylanpeacock.dev@gmail.com
          </a>
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
          <span>Built with React</span>
        </div>
      </footer>
    </section>
  )
}
