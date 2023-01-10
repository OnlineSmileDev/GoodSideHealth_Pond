import { createFilterString } from 'utils/createFilterString'
import { fetchVisits } from './visits.asyncActions'
import useAuthQuery from '../../infrastructure/useAuthQuery'
import { DELAYED_INTERVAL } from '../../config'
export const useFetchVisits = (filters) => {
  const filterQs = createFilterString(filters)
  const fullQs = filterQs ? `?${filterQs}` : ''

  return useAuthQuery({
    name: 'visits',
    url: `visits${fullQs}`,
    action: fetchVisits,
    config: {
      enabled: true,
      refetchInterval: DELAYED_INTERVAL,
    },
  })
}
