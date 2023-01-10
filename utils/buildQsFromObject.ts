export const buildQsFromObject = (obj) => {
  const keys = Object.keys(obj)
  if (keys.length > 0) {
    return keys.reduce((acc, key) => {
      if (obj[key]) {
        return acc.length === 1
          ? `${acc}${key}=${encodeURIComponent(obj[key])}`
          : `${acc}&${key}=${encodeURIComponent(obj[key])}`
      }
      return acc
    }, '?')
  }
  return ''
}
