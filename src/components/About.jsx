import { useCallback, useEffect, useRef, useState } from 'react'
import './About.css'
import polaroid from '../assets/Polaroid.png'
import blueportrait from '../assets/BluePortrait.png'
import lionpic from '../assets/lionPic.png'
import rugbypic from '../assets/rugbyPic.png'


// Placeholder set — all pointing at the same image for now. Add more entries
// (with their own imported src) to grow the stack; tilt/offset are assigned
// by index below, not by stack position, so each photo keeps its own look.
const PHOTOS = [
  { id: 'p1', src: polaroid, alt: 'Dylan Peacock, photo 1' },
  { id: 'p2', src: blueportrait, alt: 'Dylan Peacock, photo 2' },
  { id: 'p3', src: lionpic, alt: 'Dylan Peacock, photo 3' },
  { id: 'p4', src: rugbypic, alt: 'Dylan Peacock, photo 4' },
]

// Fixed per-photo tilt/offset, keyed by index into PHOTOS (cycles if there
// are more photos than presets) so each picture's look is stable as it
// moves through the stack.
const PHOTO_STYLES = [
  { rotate: -4, x: 0, y: 0 },
  { rotate: 3, x: 6, y: -4 },
  { rotate: -7, x: -5, y: 3 },
  { rotate: 5, x: 3, y: 5 },
]

// Keep in sync with the .about-photo-frame.is-lifted transition duration in About.css
const LIFT_DURATION = 260

const QUIRKS = [
  { label: 'Reading & making art', note: 'analogue hobbies for when life gets loud' },
  { label: 'Philosophy', note: 'studied it through my baccalaureate' },
  { label: 'Bilingual', note: 'fluent French & English, living in France since age 6' },
  { label: 'Snowboarding', note: 'taught by my dad — still where I find catharsis' },
  { label: 'Rugby', note: 'played to a high level, met my best friends through it' },
  { label: 'Film production & design', note: 'video essays are a genuine hobby, not procrastination' },
  { label: 'Dog', note: 'unofficial team lead on all household breaks' },
  { label: 'Music', note: 'usually playing something while I work' },
]

export default function About() {
  const [order, setOrder] = useState(() => PHOTOS.map((p) => p.id))
  const [liftedId, setLiftedId] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const cyclePhotos = useCallback(() => {
    if (liftedId || order.length < 2) return
    const frontId = order[0]
    setLiftedId(frontId)
    timeoutRef.current = setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]])
      setLiftedId(null)
    }, LIFT_DURATION)
  }, [liftedId, order])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      cyclePhotos()
    }
  }

  return (
    <section id="about" className="section section-border">
      <div className="wrap about-grid">
        <div className="about-side">
          <p className="eyebrow">About</p>
          <h2 className="about-title">Still figuring it out, deliberately.</h2>
          <div
            className="about-photo-stack"
            role="button"
            tabIndex={0}
            aria-label="Show next photo"
            onClick={cyclePhotos}
            onKeyDown={handleKeyDown}
          >
            {order.map((id, stackIndex) => {
              const photoIndex = PHOTOS.findIndex((p) => p.id === id)
              const photo = PHOTOS[photoIndex]
              const { rotate, x, y } = PHOTO_STYLES[photoIndex % PHOTO_STYLES.length]
              return (
                <div
                  key={id}
                  className={`about-photo-frame${id === liftedId ? ' is-lifted' : ''}`}
                  style={{
                    zIndex: order.length - stackIndex,
                    '--tilt': `${rotate}deg`,
                    '--offset-x': `${x}px`,
                    '--offset-y': `${y}px`,
                  }}
                >
                  <img src={photo.src} alt={photo.alt} className="about-photo" />
                </div>
              )
            })}
          </div>
        </div>

        <div className="about-body">
          <p>
            I got into computer science because I was inspired by what technology
            can do for people — stories like Turing helping break the Enigma code
            stuck with me. I like that the field keeps facing forward, and how
            readily it embraces new ideas. What draws me in specifically is systems
            design: how things actually work under the hood, especially when the
            end goal is something a real person will use.
          </p>
          <p>
            What excites me right now is also what unsettles me a little: AI has
            lowered the barrier to building software so far that it's reshaping
            what junior roles even look like. But that cuts both ways — there's
            never been a better moment to pair real domain expertise with these
            tools and build something genuinely useful.
          </p>
          <p>
            Right now I'm weighing my interests and options deliberately before
            committing to a graduate path. Not indecision — due diligence.
          </p>

          <div className="quirks">
            <p className="quirks-label">Off-screen</p>
            <ul className="quirks-list">
              {QUIRKS.map((q) => (
                <li key={q.label}>
                  <span className="quirk-name">{q.label}</span>
                  <span className="quirk-note">{q.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
