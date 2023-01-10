export const customNumberSort = (firstNum, secondNum, order) => {
  if (order === 'asc') return secondNum - firstNum
  else return firstNum - secondNum
}
