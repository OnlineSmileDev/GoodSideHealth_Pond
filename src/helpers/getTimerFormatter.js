import React from 'react'
import { VISITS_STATUS } from 'constants/visits'
import {
  convertDateTimeToSeconds,
  getFormattedTimeFromSeconds,
} from 'utils/timer'
import { Timer } from 'components/atoms/Timer'

export const getTimerFormatter = (createdAt, date, status) => {
  if (status === VISITS_STATUS.COMPLETED) {
    const timeDiffInSeconds = Math.abs(
      convertDateTimeToSeconds(createdAt) - convertDateTimeToSeconds(date)
    )
    return getFormattedTimeFromSeconds(timeDiffInSeconds)
  } else return <Timer initialTime={createdAt} />
}
