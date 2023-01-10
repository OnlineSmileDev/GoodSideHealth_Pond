export const capitalizeFirstLetterOfEachWord = (string) => {
  return (
    string &&
    string
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  )
}
