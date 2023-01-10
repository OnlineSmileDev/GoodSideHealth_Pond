import { useDispatch, useStore } from 'react-redux'
import { useQuery } from 'react-query'
import doAsync from './doAsync'
import { POLLING_INTERVAL } from '../config'

export default function useAuthQuery({
  name,
  url,
  config = { refetchInterval: POLLING_INTERVAL },
  action,
} = {}) {
  const dispatch = useDispatch()
  const { getState } = useStore()
  let isFirstCall = true

  return useQuery(
    name,
    () => {
      dispatch(action.pending())

      try {
        const result = doAsync({
          url,
          getState,
          dispatch,
          noBusySpinner: !isFirstCall,
        }).then((payload) => {
          dispatch(action.fulfilled(payload))
          return payload
        })

        isFirstCall = false

        return result
      } catch (e) {
        isFirstCall = false
        dispatch(action.rejected(e))
        return Promise.reject(e)
      }
    },
    config
  )
}
