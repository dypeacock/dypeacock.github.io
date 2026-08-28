import { useState, useEffect } from 'react'
import MediaFrame from './MediaFrame'

// Matches the site's existing mobile breakpoint (see About/Hero: the
// click/hover-driven photo stack and tag field are both hidden below this).
// The phone-frame/poster media is the same kind of interaction — no touch
// equivalent worth building — so it's simplest not to show it there at all.
const DESKTOP_QUERY = '(min-width: 601px)'

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches)

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY)
    const handleChange = (event) => setIsDesktop(event.matches)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  return isDesktop
}

// Gate at the top level, not just in CSS: a project's media can include a
// multi-megabyte video, and there's no reason for a phone on a mobile
// connection to ever fetch it when this never renders there.
export default function ProjectMedia({ media, title }) {
  const isDesktop = useIsDesktop()
  if (!media || !media.items?.length || !isDesktop) return null
  return <MediaFrame media={media} title={title} />
}
