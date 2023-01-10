import { useState } from 'react'

const useDebounce = () => {
  const [typingTimeout, setTypingTimeout] = useState('')

  return (func, delay) => {
    clearTimeout(typingTimeout)
    const timeout =
      delay &&
      setTimeout(() => {
        func()
      }, delay)
    setTypingTimeout(timeout)
  }
}
export default useDebounce
