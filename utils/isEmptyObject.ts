import { isEmpty } from 'utils/isEmpty'

export const isEmptyObject = (obj) => {
  if (isEmpty(obj)) return true
  const filterValue = Object.values(obj).filter(
    (each) => each !== null && each !== ''
  )
  return isEmpty(filterValue)
}
