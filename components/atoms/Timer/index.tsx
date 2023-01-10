import React, { useEffect, useState } from 'react'
import { convertDateTimeToSeconds } from 'utils/timer'

const DEFAULT_TIME = 0

export type TimerProps = {
  initialTime: string
}

export const Timer = ({ initialTime = '' }: TimerProps) => {
  const formattedTime = initialTime
    ? convertDateTimeToSeconds(initialTime)
    : DEFAULT_TIME

  const [time, setTime] = useState(formattedTime)

  const timeToDisplay = new Date(time * 1000).toISOString().substr(11, 8) // Substring- in order to remove the date prefix

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1)
    }, 1000)

    return () => clearInterval(interval)
  })

  return <>{timeToDisplay}</>
}
