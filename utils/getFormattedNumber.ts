export const getFormattedNumber = (count) =>
  count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const getFormattedPhoneNumber = (number) =>
  number.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')

export const getNumberFromString = (value) => value.replace(/\D/g, '')
