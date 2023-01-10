import moment from 'moment'

const DATE_WITHOUT_TIMESTAMP = 0

export const getFormattedDate = (date) =>
  date && moment(date).format('MM/DD/YY')

export const getBackendFormattedDate = (date) =>
  date && moment(date).format('YYYY-MM-DD')

export const getDateFromLabel = (label) =>
  moment(label.slice(7), 'dddd, MMMM Do, YYYY')

export const isValidDateFormat = (date, format) =>
  moment(date, format, true).isValid()

export const formattedDate = (date) => date && moment(date).format('MMMM D')

export const formattedDateWithFullMonthAndYear = (date) =>
  date && moment(date).format('MMMM DD, YYYY')

export const getIsoString = (date) => date && moment(date).format('YYYY-MM-DD')

export const getFormattedIsoString = (date) =>
  date && moment(date).toISOString(true)

export const getFormattedDayIsoString = (date) => {
  if (date) {
    const dateWithRemovedTime = new Date(date).setHours(0, 0, 0, 0)
    return new Date(dateWithRemovedTime).toISOString()
  }
  // eslint-disable-next-line
  return
}
export const convertDateToTime = (date) => moment(date, ['h:mm A']).toDate()

export const getFullFormattedDate = (date) =>
  date && moment(date).format('MM/DD/YYYY')

export const getDateWithTZRanges = (date) => {
  return `${moment(date).startOf('day').utc().toISOString()},${moment(date)
    .endOf('day')
    .utc()
    .toISOString()}`
}

export const getLastMonthWithTZRanges = (date) => {
  return `${moment(date)
    .subtract(1, 'months')
    .startOf('day')
    .utc()
    .toISOString()},${moment(date).endOf('day').utc().toISOString()}`
}

export const convertUTCtoLocale = (date) =>
  date && moment(new Date(date)).format('MM/DD/YY')

export const convertDateToUTC = (date) =>
  date && moment.utc(date, 'YYYY-MM-DD').format('MM/DD/YYYY')
// TODO: Might be good to create a small abstraction for these if this one sticks
export const convertDateToUTCWithFullMonth = (date) =>
  date && moment.utc(date, 'YYYY-MM-DD').format('MMMM DD, YYYY')

export const getDateFromIsoString = (date) =>
  date && moment(date.split('T')[DATE_WITHOUT_TIMESTAMP]).format('MM/DD/YYYY')

export const formatDateForApi = (date) =>
  date && moment(date).format('YYYY-MM-DD')

export const getCsvFormattedDate = (date) =>
  date && ` ${moment(date).format('MM/DD/YYYY')}`

export const getDateInDateTimeFormat = (date) =>
  date && moment(date).format('MMM DD, YYYY hh:mm a') // can we just use 'LLL'

export const isPastTime = (date, time) => {
  const isTodaysDate =
    new Date().setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0)
  const isPastHours = new Date(time).getHours() < new Date(date).getHours()
  const isPastMinutes =
    new Date(time).getMinutes() < new Date(date).getMinutes()
  return date && time && isTodaysDate && (isPastHours || isPastMinutes)
}
export const isFutureDate = (date) =>
  new Date(date).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)

export const isPastDate = (date) =>
  new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
