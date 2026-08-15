import { useRef, useState, useCallback } from 'react'
import './Hero.css'

// Mix of technical and personal — the point of the whole piece.
// `fill` marks the technical/professional half in solid blue; personal interests stay outlined.
const TAGS = [
  { label: 'Computer Vision', x: 8, y: 18, size: 1, fill: true, rot: -3 },
  { label: 'Rugby', x: 82, y: 12, size: 0.85, rot: 4 },
  { label: 'PyTorch', x: 20, y: 62, size: 0.9, fill: true, rot: 2 },
  { label: 'SCADA Systems', x: 68, y: 68, size: 1, fill: true, rot: -2 },
  { label: 'Snowboarding', x: 4, y: 78, size: 0.85, rot: -5 },
  { label: 'BGP Routing', x: 90, y: 45, size: 0.85, fill: true, rot: 3 },
  { label: 'Philosophy', x: 40, y: 8, size: 0.85, rot: -4 },
  { label: 'iOS / CoreML', x: 58, y: 22, size: 0.9, fill: true, rot: 2 },
  { label: 'Cinema', x: 88, y: 82, size: 0.85, rot: -3 },
  { label: 'Cryptography', x: 30, y: 88, size: 0.85, fill: true, rot: 5 },
  { label: 'French & English', x: 12, y: 42, size: 0.8, rot: -2 },
]

export default function Hero() {
  const fieldRef = useRef(null)
  const [cursor, setCursor] = useState(null)

  const handleMove = useCallback((e) => {
    const rect = fieldRef.current.getBoundingClientRect()
    setCursor({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [])

  const handleLeave = useCallback(() => setCursor(null), [])

  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Dylan Peacock — Computer Science, Loughborough</p>
          <h1 className="hero-title">
            I build things at the edge of what I understand,
            <span className="hero-title-accent"> then figure out the rest.</span>
          </h1>
          <p className="hero-sub">
            First-class CS graduate with a year shipping production SCADA software
            and a final-year project spent teaching a phone to watch how you walk.
            Still deciding exactly where to point all of it next — on purpose.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">See the work</a>
            <a className="btn btn-ghost" href="#contact">Get in touch</a>
          </div>
        </div>

        <div
          className="hero-field"
          ref={fieldRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          {TAGS.map((tag, i) => {
            let dx = 0, dy = 0
            if (cursor) {
              const distX = tag.x - cursor.x
              const distY = tag.y - cursor.y
              const dist = Math.sqrt(distX * distX + distY * distY)
              const radius = 26
              if (dist < radius) {
                const force = (1 - dist / radius) * 14
                const norm = dist === 0 ? 1 : dist
                dx = (distX / norm) * force
                dy = (distY / norm) * force
              }
            }
            return (
              <span
                key={tag.label}
                className={`hero-tag${tag.fill ? ' hero-tag-fill' : ''}`}
                style={{
                  left: `${tag.x}%`,
                  top: `${tag.y}%`,
                  fontSize: `${0.78 * tag.size}rem`,
                  transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${tag.rot}deg)`,
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                {tag.label}
              </span>
            )
          })}
        </div>
      </div>
    </header>
  )
}
