export const getFormattedTime = (date) => {
  const formattedDate = new Date(date)
  let hours = formattedDate.getHours()
  let minutes = formattedDate.getMinutes()
  //@ts-ignore
  minutes = minutes < 10 ? '0' + minutes : minutes
  const meridianIndicator = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours !== 0 ? hours : 12
  //@ts-ignore
  hours = hours < 10 ? '0' + hours : hours
  return `${hours}:${minutes} ${meridianIndicator}`
}

export const getTimeInCustomInputFormat = (date) => {
  const formattedDate = new Date(date)
  let hours = formattedDate.getHours()
  let minutes = formattedDate.getMinutes()
  //@ts-ignore
  minutes = minutes < 10 ? '0' + minutes : minutes
  const meridianIndicator = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours !== 0 ? hours : 12
  //@ts-ignore
  hours = hours < 10 ? '0' + hours : hours
  return {
    hours: hours.toString(),
    minutes: minutes.toString(),
    meridianIndicator: meridianIndicator,
  }
}

export const getTimeIn24HourFormat = (date) => {
  const { hours, minutes, meridianIndicator } = date
  let formattedHours = parseInt(hours)
  if (meridianIndicator === 'PM' && formattedHours < 12) {
    formattedHours = formattedHours + 12
  } else if (meridianIndicator === 'AM' && formattedHours === 12) {
    formattedHours = formattedHours - 12
  }
  return `${formattedHours}:${minutes}`
}

export const getTimeIn12HourFormat = (timeObj) => {
  const { hours, minutes, meridianIndicator } = timeObj
  return `${hours}:${minutes} ${meridianIndicator}`
}
