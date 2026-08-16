import './Hero.css'

// Mix of technical and personal
// `fill` marks the technical/professional half in solid blue; personal interests stay outlined.
// Hovering a tag expands it in place — no cursor-tracking physics, just a direct reaction.
const TAGS = [
  { label: 'Computer Vision', x: 7, y: 15, size: 1, fill: true, rot: -3 },
  { label: 'Rugby', x: 47, y: 46, size: 0.85, rot: 4 },
  { label: 'PyTorch', x: 18, y: 58, size: 0.9, fill: true, rot: 2 },
  { label: 'SCADA Systems', x: 64, y: 64, size: 1, fill: true, rot: -2 },
  { label: 'Snowboarding', x: 4, y: 76, size: 0.85, rot: -5 },
  { label: 'BGP Routing', x: 88, y: 42, size: 0.85, fill: true, rot: 3 },
  { label: 'Philosophy', x: 38, y: 6, size: 0.85, rot: -4 },
  { label: 'iOS / CoreML', x: 55, y: 20, size: 0.9, fill: true, rot: 2 },
  { label: 'Cinema', x: 84, y: 78, size: 0.85, rot: -3 },
  { label: 'Cryptography', x: 27, y: 86, size: 0.85, fill: true, rot: 5 },
  { label: 'French & English', x: 8, y: 40, size: 0.8, rot: -2 },
  { label: 'Dog', x: 80, y: 10, size: 0.8, rot: 3 },
  { label: 'Music', x: 65, y: 90, size: 0.8, rot: -4 },
]

export default function Hero() {
  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-byline">
            {/*<img src={portrait} alt="Portrait of Dylan Peacock" className="hero-portrait" />*/}
            <p className="eyebrow">Dylan Peacock – Computer Science, Loughborough</p>
          </div>
          <h1 className="hero-title">
            I build things at the edge of what I understand,
            <span className="hero-title-accent"> then figure out the rest.</span>
          </h1>
          <p className="hero-sub">
            First-class CS graduate with a year on a production SCADA team
            and a final-year project spent teaching a phone to watch how you walk.
            Still deciding exactly where to point all of it next, on purpose.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">See the work</a>
            <a className="btn btn-ghost" href="#contact">Get in touch</a>
          </div>
        </div>

        <div className="hero-field">
          {TAGS.map((tag, i) => (
            <span
              key={tag.label}
              className={`hero-tag${tag.fill ? ' hero-tag-fill' : ''}`}
              style={{
                left: `${tag.x}%`,
                top: `${tag.y}%`,
                fontSize: `${0.78 * tag.size}rem`,
                '--rot': `${tag.rot}deg`,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
