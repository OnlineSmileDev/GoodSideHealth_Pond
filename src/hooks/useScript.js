import { useState, useEffect } from 'react'

const scriptStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error',
}

export default function useScript(url, callback, options = {}) {
  const attributes = options?.attributes
  const [status, setStatus] = useState(() => {
    const script = document.querySelector(`script[src="${url}"]`)
    if (script && script.hasAttribute('data-status')) {
      return script.getAttribute('data-status')
    }
    return url ? scriptStatus.LOADING : scriptStatus.IDLE
  })

  useEffect(() => {
    if (!url) {
      setStatus(scriptStatus.IDLE)
      return
    }

    let script = document.querySelector(`script[src="${url}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = url
      script.async = true
      script.setAttribute('data-status', scriptStatus.LOADING)
      document.head.appendChild(script)
      if (attributes) {
        Object.keys(attributes).forEach((key) => {
          return script?.setAttribute(key, attributes[key])
        })
      }

      // Ensure the status is loading
      setStatus(scriptStatus.LOADING)

      script.onerror = () => {
        if (script) script.setAttribute('data-status', scriptStatus.ERROR)
      }
      script.onload = () => {
        if (script) script.setAttribute('data-status', scriptStatus.READY)
        if (callback && typeof callback === 'function') {
          callback()
        }
      }
    } else if (script.hasAttribute('data-status')) {
      setStatus(script.getAttribute('data-status'))
    }

    const eventHandler = (e) => {
      setStatus(e.type === 'load' ? scriptStatus.READY : scriptStatus.ERROR)
    }

    // Add load event listener
    script.addEventListener('load', eventHandler)
    script.addEventListener('error', eventHandler)

    return () => {
      if (script) {
        script.removeEventListener('load', eventHandler)
        script.removeEventListener('error', eventHandler)
      }
    }
  }, [url, attributes, callback])

  return [status === scriptStatus.READY, status]
}
