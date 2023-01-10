import { useRef, useEffect } from 'react'

const useDidMountEffect = (logicToExecute, dependencies = []) => {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) logicToExecute()
    else didMount.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export default useDidMountEffect
