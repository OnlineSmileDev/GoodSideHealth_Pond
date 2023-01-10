const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MINUTE = 60
const DOUBLE_DIGIT = 10

export const convertDateTimeToSeconds = (dateTime) =>
  (+new Date() - +new Date(dateTime)) / 1000

export const getFormattedTimeFromSeconds = (formattedSeconds) => {
  const totalSeconds = parseInt(formattedSeconds)
  const hours = Math.floor(totalSeconds / SECONDS_IN_HOUR)
  const minutes =
    Math.floor(totalSeconds / SECONDS_IN_MINUTE) % SECONDS_IN_MINUTE
  const seconds = totalSeconds % SECONDS_IN_MINUTE
  return [hours, minutes, seconds]
    .map((each) => (each < DOUBLE_DIGIT ? '0' + each : each))
    .join(':')
}
