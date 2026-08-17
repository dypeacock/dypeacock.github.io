import { useCallback, useEffect, useRef, useState } from 'react'
import './About.css'
import polaroid from '../assets/gradPolaroid.png'
import bluePolaroid from '../assets/bluePolaroid.png'
import lionPolaroid from '../assets/lionPolaroid.png'
import rugbyPolaroid from '../assets/rugbyPolaroid.png'


const PHOTOS = [
  { id: 'p1', src: polaroid, alt: 'Dylan Peacock, photo 1' },
  { id: 'p2', src: bluePolaroid, alt: 'Dylan Peacock, photo 2' },
  { id: 'p3', src: lionPolaroid, alt: 'Dylan Peacock, photo 3' },
  { id: 'p4', src: rugbyPolaroid, alt: 'Dylan Peacock, photo 4' },
]

const PHOTO_STYLES = [
  { rotate: -4, x: 0, y: 0 },
  { rotate: 3, x: 6, y: -4 },
  { rotate: -7, x: -5, y: 3 },
  { rotate: 5, x: 3, y: 5 },
]

// Keep in sync with the .about-photo-frame.is-picking-up transition duration in About.css
// this is how long the "pick up & drift right" phase runs before the card is reordered
// to the back of the stack and eases into its "drop into the stack" pose.
const PICKUP_DURATION = 220

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

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
  const [cyclingId, setCyclingId] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const cyclePhotos = useCallback(() => {
    if (cyclingId || order.length < 2) return
    const frontId = order[0]
    // Reduced-motion users get the same CSS transitions collapsed to ~instant (see
    // About.css), so there's no reason to hold the reorder behind the pickup delay here.
    const prefersReducedMotion = window.matchMedia?.(REDUCED_MOTION_QUERY).matches
    setCyclingId(frontId)
    timeoutRef.current = setTimeout(() => {
      // Reorder to the back and drop the "picking up" pose in the same update, so the
      // card's transform eases from its lifted/drifted pose straight into its resting
      // tilt — but now underneath the rest of the stack, reading as it dropping in.
      setOrder((prev) => [...prev.slice(1), prev[0]])
      setCyclingId(null)
    }, prefersReducedMotion ? 0 : PICKUP_DURATION)
  }, [cyclingId, order])

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
            className={`about-photo-stack${cyclingId ? ' is-cycling' : ''}`}
            role="button"
            tabIndex={0}
            aria-label="Show next photo"
            onClick={cyclePhotos}
            onKeyDown={handleKeyDown}
          >
            {/* Mapped over PHOTOS (fixed order), never over `order`: reordering the
                DOM itself breaks the CSS transition on the card being cycled to the back
                (moving a node's position in the tree resets its in-flight transition). Stack
                position is expressed purely through z-index/className instead. */}
            {PHOTOS.map((photo, photoIndex) => {
              const stackIndex = order.indexOf(photo.id)
              const isFront = stackIndex === 0
              const { rotate, x, y } = PHOTO_STYLES[photoIndex % PHOTO_STYLES.length]
              return (
                <div
                  key={photo.id}
                  className={`about-photo-frame${isFront ? ' is-front' : ''}${photo.id === cyclingId ? ' is-picking-up' : ''}`}
                  style={{
                    zIndex: PHOTOS.length - stackIndex,
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
