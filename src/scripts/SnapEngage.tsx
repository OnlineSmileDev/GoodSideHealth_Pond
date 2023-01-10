import Script from 'next/script'

declare global {
  interface Window {
    se_Name: string
    se_Email: string
    se_Role: string
    se_orgName: string
  }
}

interface SnapEngageProps {
  name?: string
  email?: string
  role?: string
  orgName?: string
}

export default function SnapEngageScript({
  name,
  email,
  role,
  orgName,
}: SnapEngageProps) {
  function onLoad() {
    window.se_Name = name
    window.se_Email = email
    window.se_Role = role
    window.se_orgName = orgName
    // @ts-ignore
    // eslint-disable-next-line no-undef
    SnapEngage.setUserEmail(email, true)
    // @ts-ignore
    // eslint-disable-next-line no-undef
    SnapEngage.setUserName(name)
    // @ts-ignore
    // eslint-disable-next-line no-undef
    SnapEngage.setCustomField('Role', role)
    // @ts-ignore
    // eslint-disable-next-line no-undef
    SnapEngage.setCustomField('Organization', orgName)
  }

  return (
    <Script
      src={`https://storage.googleapis.com/code.snapengage.com/js/${process.env.NEXT_PUBLIC_SNAPENGAGE}.js`}
      strategy={'lazyOnload'}
      onLoad={onLoad}
    />
  )
}
