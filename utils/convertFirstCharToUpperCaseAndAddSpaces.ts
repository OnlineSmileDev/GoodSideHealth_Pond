export const convertFirstCharToUpperCaseAndAddSpaces = (str) => {
  const stringWithWhiteSpaces = str.replace(/([A-Z])/g, ' $1')
  return `${stringWithWhiteSpaces
    .charAt(0)
    .toUpperCase()}${stringWithWhiteSpaces.substr(1)}`
}
