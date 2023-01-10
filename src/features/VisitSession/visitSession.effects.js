import { fetchVisitSession } from './visitSession.asyncActions'
import useAuthQuery from '../../infrastructure/useAuthQuery'
import { DELAYED_INTERVAL } from '../../config'
export const useFetchVisitSession = (id) => {
  useAuthQuery({
    name: 'sessions/id',
    url: `sessions/${id}`,
    action: fetchVisitSession,
    config: { refetchInterval: DELAYED_INTERVAL },
  })
}
