import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import './Nav.css'

const LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Work' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link to="/" className="nav-mark">DP</Link>
        <div className="nav-right">
          <div className="nav-links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'dark'}
          >
            <span className={`theme-toggle-icon${theme === 'dark' ? ' is-dark' : ''}`} aria-hidden="true">
              {theme === 'dark' ? '☾' : '☀'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
