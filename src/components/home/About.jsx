import { useCallback, useEffect, useRef, useState } from 'react'
import { cx } from '../../lib/cx'
import styles from './About.module.css'
import polaroid from '../../assets/gradPolaroid.png'
import bluePolaroid from '../../assets/bluePolaroid.png'
import lionPolaroid from '../../assets/lionPolaroid.png'
import rugbyPolaroid from '../../assets/rugbyPolaroid.png'


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

// Keep in sync with the .photoFrame.isPickingUp transition duration in About.module.css
// this is how long the "pick up & drift right" phase runs before the card is reordered
// to the back of the stack and eases into its "drop into the stack" pose.
const PICKUP_DURATION = 220

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const QUIRKS = [
  { label: 'Rugby', note: 'As fly-half I\'m often bossing around bigger and more experienced players than myself! Working in high-stakes collaborative team environments for over a dozen years'},
  { label: 'Bilingual', note: 'Learnt to speak fluent french after moving to France at six. Made a habit of being the odd one out, the foreign kid at school or on the pitch, and won people over anyway'},
  { label: 'Reading & making art', note: 'I\'m a firm believer in the need for analogue hobbies in this day and age. Getting back in the habit of sketching in my downtime' },
  { label: 'Snowboarding', note: 'After a lot of blood, sweat and tears, I\'m now an avid snowboarder and love nothing more than a fresh powder day'},
  { label: 'Film production & design', note: 'Another hobby is watching video essays of my favourite films and series. Often leaving reviews on Letterboxd' },
  { label: 'Joe (Dog)', note: 'Unofficial team lead on all household breaks. He thinks he sits above me in the family pack hierarchy (he\'s probably right)' },
  { label: 'Music', note: 'Grew up listening to Classic Rock, my playlist has more 70s hits than post-2000 tracks' },
  { label: 'Studied philosophy', note: 'Mandatory class for the french baccalaureat. I was sceptical at first, but the critical thinking it taught me shows up everywhere else I work' },
]

export default function About() {

  const [order, setOrder] = useState(() => PHOTOS.map((p) => p.id))
  const [cyclingId, setCyclingId] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const cyclePhotos = useCallback(() => {
    if (cyclingId || order.length < 2) return
    const frontId = order[0]
    // Reduced-motion users get the same CSS transitions collapsed to ~instant (see About.module.css),
    // so there's no reason to hold the reorder behind the pickup delay here.
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
      <div className={cx('wrap', styles.grid)}>
        <div className={styles.side}>
          <p className="eyebrow">About</p>
          <h2 className={styles.heading}>Still figuring it out, deliberately</h2>
          <div
            className={cx(styles.photoStack, cyclingId && styles.isCycling)}
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
                  className={cx(styles.photoFrame, isFront && styles.isFront, photo.id === cyclingId && styles.isPickingUp)}
                  style={{
                    zIndex: PHOTOS.length - stackIndex,
                    '--tilt': `${rotate}deg`,
                    '--offset-x': `${x}px`,
                    '--offset-y': `${y}px`,
                  }}
                >
                  <img src={photo.src} alt={photo.alt} className={styles.photo} />
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.body}>
          <p>
            I got into computer science because I was inspired by what technology
            can do for people. I like that the field keeps facing forward, and how
            readily it embraces new ideas. What draws me in specifically is systems
            design: how things actually work, especially when the end goal is something
            a real person will use.
          </p>
          <p>
            What motivates me is less the code itself and more what sits underneath it: a problem.
            Give me something that doesn't work yet and I'll find a way in, even if that means picking
            up a language, a protocol, or a whole new field I had no business knowing three weeks ago.
            That's more or less how I ended up working with things like BGP routing and CoreML: not
            because I set out to learn them, but because a problem needed them.
          </p>
          <p>
            What excites me right now is also what unsettles me a little: AI has
            lowered the barrier to building software so far that it's reshaping
            what junior roles even look like. But there's also never been a
            better moment to pair real domain expertise with these tools and
            build something genuinely useful.
          </p>
          <p>
            Right now I'm weighing my interests and options deliberately before
            committing to a graduate path.
          </p>

          <div className={styles.quirks}>
            <p className={styles.quirksLabel}>Off-screen</p>
            <ul className={styles.quirksList}>
              {QUIRKS.map((q) => (
                <li key={q.label}>
                  <span className={styles.quirkName}>{q.label}</span>
                  <span className={styles.quirkNote}>{q.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
