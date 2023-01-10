import { useState, useEffect } from 'react'
import json2mq from 'json2mq'

function getMediaQuery(query) {
  return window.matchMedia(typeof query === 'string' ? query : json2mq(query))
}

export default function useMedia(query, defaultMatches = true) {
  const [matches, setMatches] = useState(() => {
    const initialQuery = getMediaQuery(query)
    return initialQuery ? initialQuery.matches : defaultMatches
  })

  useEffect(() => {
    const mediaQuery = getMediaQuery(query)
    if (!mediaQuery) return undefined

    setMatches(mediaQuery.matches)

    const listener = () => setMatches(mediaQuery.matches)
    mediaQuery.addListener(listener)

    return () => {
      mediaQuery.removeListener(listener)
    }
  }, [query])

  return matches
}
