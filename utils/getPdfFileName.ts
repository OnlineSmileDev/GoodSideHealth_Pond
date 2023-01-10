export const getPdfFileName = ({ firstName, lastName, updatedAt }) => {
  const firstInitial = firstName.slice(0, 1)
  return `${firstInitial ?? ''}-${lastName ?? ''}-${updatedAt}.pdf`
}
