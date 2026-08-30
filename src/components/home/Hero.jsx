import { cx } from '../../lib/cx'
import shared from '../../styles/shared.module.css'
import styles from './Hero.module.css'

// Mix of technical and personal
// `fill` marks the technical/professional half in solid blue; personal interests stay outlined.
// Hovering a tag expands it in place — no cursor-tracking physics, just a direct reaction.
// `desc` is a short first-person note surfaced in a hover bubble — see getBubblePlacement below
// for how each bubble decides which side of the tag to open on.
const TAGS = [
  { label: 'Computer Vision', x: 7, y: 15, size: 1, fill: true, rot: -3, desc: "Learned it for my dissertation, then built and shipped the algorithms myself for my final-year project" },
  { label: 'Rugby', x: 47, y: 46, size: 0.85, rot: 4, desc: "Fly-half for over a dozen years. Used to directing players bigger and more experienced than me" },
  { label: 'PyTorch', x: 18, y: 58, size: 0.9, fill: true, rot: 2, desc: "My go-to for training and quantising models, from GAN experiments to the pose-estimation network in my final-year project" },
  { label: 'SCADA Systems', x: 64, y: 64, size: 1, fill: true, rot: -2, desc: "A year on Ovarro's product team, keeping the software behind water and energy infrastructure running" },
  { label: 'Snowboarding', x: 4, y: 76, size: 0.85, rot: -5, desc: "After a lot of blood, sweat and tears, I\'m now an avid snowboarder and love nothing more than a fresh powder day" },
  { label: 'BGP Routing', x: 88, y: 42, size: 0.85, fill: true, rot: 3, desc: "Configured real peering sessions between autonomous systems for a networking module" },
  { label: 'Philosophy', x: 38, y: 6, size: 0.85, rot: -4, desc: "Mandatory for the French Baccalaureat. Wasn't sold at first; the critical thinking stuck with me everywhere since" },
  { label: 'iOS / CoreML', x: 55, y: 20, size: 0.9, fill: true, rot: 2, desc: "Quantised and exported a pose-estimation model to CoreML so it runs fully on-device, no server needed" },
  { label: 'Cinema', x: 84, y: 78, size: 0.85, rot: -3, desc: "Watching video essays of my favourite films and series, often leaving reviews on Letterboxd" },
  { label: 'Cryptography', x: 27, y: 86, size: 0.85, fill: true, rot: 5, desc: "TLS, PKI, the theory behind keeping systems honest" },
  { label: 'French & English', x: 8, y: 40, size: 0.8, rot: -2, desc: "Moved to France at six and learned fluent French the hard way: being the foreign kid at school and on the pitch" },
  { label: 'Dog', x: 80, y: 10, size: 0.8, rot: 3, desc: "Joe. Unofficial team lead on all household breaks, and he's fairly sure he outranks me" },
  { label: 'Music', x: 65, y: 90, size: 0.8, rot: -4, desc: "Grew up on Classic Rock, my playlist still leans more 70s than anything post-2000" },
]

// Bubbles open toward whichever side of the field has more room, derived from
// each tag's own placement rather than measured at runtime.
function getBubblePlacement(x, y) {
  const vertical = y >= 50 ? 'top' : 'bottom'
  const horizontal = x < 25 ? 'left' : x > 75 ? 'right' : 'center'
  return { vertical, horizontal }
}

export default function Hero() {
  return (
    <header id="hero" className={styles.hero}>
      <div className={cx('wrap', styles.grid)}>
        <div className={styles.copy}>
          <div className={styles.byline}>
            <p className="eyebrow">Dylan Peacock – Computer Science, Loughborough</p>
          </div>
          <h1 className={styles.heading}>
            I build things at the edge of what I understand,
            <span className={styles.headingAccent}> then figure out the rest</span>
          </h1>
          <p className={styles.subhead}>
            First-class CS graduate with a year on a production SCADA team
            and a final-year project spent teaching a phone to watch how you walk.
            Still deciding exactly where to point all of it next, on purpose.
          </p>
          <div className={styles.actions}>
            <a className={cx(shared.btn, shared.btnPrimary)} href="#projects">See the work</a>
            <a className={cx(shared.btn, shared.btnGhost)} href="#contact">Get in touch</a>
          </div>
        </div>

        <div id="tagsField" className={styles.field}>
          {TAGS.map((tag, i) => {
            const { vertical, horizontal } = getBubblePlacement(tag.x, tag.y)
            return (
              <span
                key={tag.label}
                className={cx(styles.tag, tag.fill && styles.tagFill)}
                style={{
                  left: `${tag.x}%`,
                  top: `${tag.y}%`,
                  fontSize: `${0.78 * tag.size}rem`,
                  '--rot': `${tag.rot}deg`,
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                {tag.label}
                {tag.desc && (
                  <span
                    className={cx(
                      styles.bubbleAnchor,
                      vertical === 'top' ? styles.bubbleTop : styles.bubbleBottom,
                      horizontal === 'left' && styles.bubbleLeft,
                      horizontal === 'right' && styles.bubbleRight,
                      horizontal === 'center' && styles.bubbleCenter
                    )}
                  >
                    <span className={styles.bubble}>{tag.desc}</span>
                  </span>
                )}
              </span>
            )
          })}
        </div>
      </div>
    </header>
  )
}
