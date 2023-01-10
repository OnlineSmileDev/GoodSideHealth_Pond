export const customTableSort = (itemA, itemB, order) => {
  if (order === 'asc') {
    if (itemA < itemB) return -1
    return 1
  }
  if (order === 'desc') {
    if (itemA > itemB) return -1
    return 1
  }
}
