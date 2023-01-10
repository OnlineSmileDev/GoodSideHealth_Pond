export const getDaysSinceDate = (dateTime) => {
  const dayLength = 1000 * 60 * 60 * 24
  return Math.round((+new Date() - +new Date(dateTime)) / dayLength)
}
