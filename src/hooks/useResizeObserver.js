import { useState, useRef, useCallback, useLayoutEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
const useResizeObserver = () => {
  const [observeEntry, setObserveEntry] = useState({})
  const [node, setNode] = useState(null)
  const observer = useRef(null)

  const disconnect = useCallback(() => observer.current?.disconnect(), [])
  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => setObserveEntry(entry))
    if (node) observer.current.observe(node)
  }, [node])
  useLayoutEffect(() => {
    observe()
    return () => disconnect()
  }, [disconnect, observe])
  return [setNode, observeEntry]
}

export default useResizeObserver
