export const getAgeFromDateOfBirth = (dateOfBirth) => {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let ageDiff = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    ageDiff = ageDiff - 1
  }

  return ageDiff
}
