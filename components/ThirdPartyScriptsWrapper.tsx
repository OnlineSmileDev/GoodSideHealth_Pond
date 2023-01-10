import { useSelector } from 'react-redux'
import { selectUserDetails } from '../src/features/Users/users.selectors'
import SnapEngageScript from '../src/scripts/SnapEngage'
import PendoScript from '../src/scripts/Pendo'

export default function ThirdPartyScriptsWrapper() {
  const { id, firstName, lastName, credentials, email, organization, role } =
    useSelector(selectUserDetails)
  const name = `${firstName} ${lastName} ${credentials ?? ''}`
  const orgName = organization?.name ?? ''

  const isUserDataAvailable = id && name && email && orgName && role

  if (!isUserDataAvailable) return null

  return (
    <>
      <SnapEngageScript
        name={name}
        email={email}
        orgName={orgName}
        role={role}
      />
      <PendoScript
        id={id}
        name={name}
        email={email}
        organization={organization}
        role={role}
      />
    </>
  )
}
