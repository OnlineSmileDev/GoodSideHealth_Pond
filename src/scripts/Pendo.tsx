import Script from 'next/script'

const { NODE_ENV } = process.env

interface PendoProps {
  id?: string
  name?: string
  email?: string
  role?: string
  organization?: { id?: string; name?: string }
}

export default function PendoScript({
  id,
  name,
  email,
  role,
  organization,
}: PendoProps) {
  function onLoad() {
    // eslint-disable-next-line no-undef
    const pendoData: pendo.InitOptions = {
      visitor: {
        id: NODE_ENV === 'production' ? id : `DEV_${id}`,
        email,
        role,
        full_name: name,
      },
    }

    if (organization) {
      const { id: orgId, name: orgName } = organization
      pendoData.account = {
        id: NODE_ENV === 'production' ? orgId : `DEV_${orgId}`,
        name: orgName,
      }
    }

    // eslint-disable-next-line no-undef
    pendo.initialize(pendoData)
  }

  return (
    <Script
      src={`https://cdn.pendo.io/agent/static/${process.env.NEXT_PUBLIC_PENDO}/pendo.js`}
      strategy={'afterInteractive'}
      onLoad={onLoad}
    />
  )
}
