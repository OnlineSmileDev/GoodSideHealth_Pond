export const getWcpUilDischargeNoteFileName = ({ firstName, lastName }) => {
  const firstInitial = firstName.slice(0, 1)
  return `${firstInitial}_${lastName}.pdf`
}

export const getWcpProviderDocumentationFileName = ({
  firstName,
  lastName,
}) => {
  const firstInitial = firstName.slice(0, 1)
  return `${firstInitial}_${lastName}-Provider-Documentation.pdf`
}
