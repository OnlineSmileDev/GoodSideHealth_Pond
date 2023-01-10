import { createFilterString } from 'utils/createFilterString'
import {
  fetchScheduleArchiveData,
  fetchVisitsOfSchedule,
  fetchSchedulePatients,
} from './scheduleArchive.asyncActions'
import useAuthQuery from '../../infrastructure/useAuthQuery'
import { DELAYED_INTERVAL } from '../../config'

export const useFetchScheduleArchiveData = (filters) => {
  const filterQs = createFilterString(filters)
  const fullQs = filterQs ? `?${filterQs}` : ''

  useAuthQuery({
    name: 'sessions',
    url: `sessions${fullQs}`,
    action: fetchScheduleArchiveData,
    config: { refetchInterval: DELAYED_INTERVAL },
  })
}

export const useFetchVisitsOfSchedule = (sessionId) => {
  useAuthQuery({
    name: 'visitsSession',
    url: `visits?sessionId=${sessionId}&getExtendedData=true`,
    action: fetchVisitsOfSchedule,
  })
}

export const useFetchSchedulePatients = (filters) => {
  const filterQs = createFilterString(filters)
  const fullQs = filterQs ? `&${filterQs}` : ''

  useAuthQuery({
    name: 'schedulePatients',
    url: `sessions?visits=true&allScheduledDates=true${fullQs}`,
    action: fetchSchedulePatients,
  })
}
