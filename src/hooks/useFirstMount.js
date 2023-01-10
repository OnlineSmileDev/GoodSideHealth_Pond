import { useRef } from 'react'

function useFirstMount() {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}

export default useFirstMount
