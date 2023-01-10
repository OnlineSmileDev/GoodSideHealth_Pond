import { useMemo } from 'react'
import { useRouter } from 'next/router'
import SendBird from 'sendbird'
import { useSelector } from 'react-redux'
import { ChatContainer } from 'components/organisms/ChatContainer'
import { selectUserDetails } from '../Users'
import { selectVisitDetails } from './visitItem.selectors'

const ChatBox = ({ title }) => {
  const router = useRouter()
  const { id } = router.query
  const user = useSelector(selectUserDetails)
  const { facilitatorId, providerId } = useSelector(selectVisitDetails)
  const client = new SendBird({
    appId: process.env.NEXT_PUBLIC_SENDBIRD_APP_ID,
  })
  const participants = useMemo(
    () => [`${facilitatorId}`, `${providerId}`],
    [facilitatorId, providerId]
  )

  return (
    <ChatContainer
      client={client}
      userId={user.id}
      channelName={id}
      participants={participants}
      title={title}
    />
  )
}

export default ChatBox
