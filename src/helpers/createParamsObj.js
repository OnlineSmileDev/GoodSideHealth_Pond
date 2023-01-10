export const createParamsObj = (str) =>
  str.split('&').reduce((prev, curr) => {
    const p = curr.split('=')
    prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1])
    return prev
  }, {})
