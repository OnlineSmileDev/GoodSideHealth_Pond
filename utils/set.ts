export const set = (obj: object, path: string | string[], value: any) => {
  const pList = Array.isArray(path) ? path : path.split('.')
  pList.slice(0, -1).forEach((elem) => {
    if (!obj[elem] || typeof obj[elem] !== 'object') {
      obj[elem] = {}
    }
    obj = obj[elem]
  })
  // set value to last key
  obj[pList[pList.length - 1]] = value
}
