import { useEffect, useCallback, useState, useRef } from 'react'
import { Image } from 'react-bootstrap'
import { GroupChannel } from 'sendbird'
import { Message } from './Message'
import { InputWidget } from 'components/molecules/InputWidget'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import Icons from '../../../src/assets/icons'
import { ImageViewer } from '../ImageViewer'

export type ChatContainerProps = {
  channelName: string | Array<string>
  client: any
  userId: number
  participants: Array<string>
  title: string
}

const ENTER_KEY = 13

export const ChatContainer = ({
  channelName,
  client,
  userId,
  participants,
  title = 'Message',
}: ChatContainerProps) => {
  const [roomChats, setRoomChats] = useState([])
  const [message, setMessage] = useState('')
  const [channel, setChannel] = useState<GroupChannel>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [facilitatorId, providerId] = participants
  const [imageForView, setImageForView] = useState({
    show: false,
    url: '',
    name: '',
  })
  const CHANNEL_URL = `${facilitatorId}_${providerId}_${channelName}`

  const fileRef = useRef(null)
  const chatContainerRef = useRef(null)

  const isSentMessage = (message) => message._sender.userId == userId

  const createChannel = useCallback(() => {
    const params = new client.GroupChannelParams()
    params.isPublic = false
    params.isDistinct = false
    params.name = channelName
    params.addUserIds([...participants])
    params.channelUrl = CHANNEL_URL

    client.GroupChannel.createChannel(params, function (groupChannel, error) {
      if (error) {
        // Handle error.
        console.log('Error While creating channel', error)
      }
      setChannel(groupChannel)
    })
  }, [CHANNEL_URL, channelName, client, participants])

  const sendMessage = () => {
    const params = new client.UserMessageParams()
    params.message = message

    channel.sendUserMessage(params, (textMessage, error) => {
      if (error) {
        // Handle error
        console.log('Error While sending message', error)
      }
      setRoomChats((prevMessages) => [textMessage, ...prevMessages])
      chatContainerRef.current.scroll({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    })
    setMessage('')
  }

  const sendFileMessage = (files) => {
    if (files.length > 0) {
      const params = new client.FileMessageParams()
      const { type, size } = files[0]

      params.file = files[0]
      params.fileSize = size
      params.mimeType = type

      channel.sendFileMessage(params, function (fileMessage, error) {
        if (error) {
          // Handle error.
          console.log('Error While sending attachment', error)
        }
        setRoomChats((prevMessages) => [fileMessage, ...prevMessages])
        chatContainerRef.current.scroll({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth',
        })
      })
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode == ENTER_KEY && e.shiftKey == false) {
      e.preventDefault()
      message && sendMessage()
    }
  }

  const getChannelUrl = useCallback(() => {
    const channelListQuery = client.GroupChannel.createMyGroupChannelListQuery()
    channelListQuery.includeEmpty = true
    channelListQuery.channelNameContainsFilter = channelName
    channelListQuery.channelUrlsFilter = [CHANNEL_URL]

    if (channelListQuery.hasNext) {
      channelListQuery.next(function (groupChannels, error) {
        if (error) {
          // Handle error.
          console.log('Error While fetching existing channel', error)
        }
        const [currentChannel] = groupChannels || []
        if (currentChannel) {
          setChannel(currentChannel)
        } else createChannel()
      })
    }
  }, [channelName, CHANNEL_URL, client, createChannel])

  const fetchPreviousMessages = useCallback(() => {
    var listQuery = channel.createPreviousMessageListQuery()

    // Retrieving previous messages.
    listQuery.load(function (messageList, error) {
      if (error) {
        // Handle error.
        console.log('Error While fetching previous messages', error)
      }
      setRoomChats(messageList.reverse())
      setIsLoading(false)
    })
  }, [channel])

  useEffect(() => {
    client.connect(String(userId), (user, error) => {
      if (error) {
        // Handle error.
        console.log('Error While connecting user to sendbird server', error)
      }
    })
    if (!channel) {
      getChannelUrl()
    } else if (channel) {
      fetchPreviousMessages()
      const channelHandler = new client.ChannelHandler()
      channelHandler.onMessageReceived = (channel, message) => {
        setRoomChats((prevMessages) => [message, ...prevMessages])
      }

      client.addChannelHandler(userId, channelHandler)
    }

    return () => {
      client.removeAllChannelHandlers()
      client.disconnect()
    }
  }, [channel, client, userId, fetchPreviousMessages, getChannelUrl])

  return (
    <>
      {imageForView.show && (
        <ImageViewer
          reset={() => setImageForView({ show: false, url: '', name: '' })}
          image={imageForView}
        />
      )}
      <div className='tw-w-full tw-mx-auto tw-shadow tw-font-hind tw-bg-white tw-rounded'>
        <div className='tw-p-5 tw-shadow-lg tw-font-bold tw-text-lg'>
          {title}
        </div>
        <div
          className='chat-container tw-h-485 tw-overflow-y-scroll tw-p-5 tw-flex-auto tw-flex tw-flex-col-reverse'
          ref={chatContainerRef}
        >
          {!isLoading ? (
            roomChats.map((each) => (
              <Message
                key={each.messageId}
                messageDetails={{
                  ...each,
                  imageUrl: each.url,
                  isSent: isSentMessage(each),
                }}
                setImageForView={setImageForView}
              />
            ))
          ) : (
            <h1>Loading ...</h1>
          )}
        </div>
        <form
          onSubmit={(ev) => ev.preventDefault()}
          className='tw-p-5 tw-border-t'
        >
          <InputWidget
            as='textarea'
            onKeyDown={handleKeyPress}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <InputWidget
            as='file'
            forwardedRef={fileRef}
            className='tw-hidden'
            onChange={(e) => sendFileMessage(e.target.files)}
          />
          <div className='tw-flex tw-justify-between tw-mt-4'>
            <Button
              type='submit'
              variant={BUTTON_VARIANT.PRIMARY}
              onClick={() => message && sendMessage()}
            >
              Send
            </Button>
            <Button
              variant={BUTTON_VARIANT.LIGHTEST}
              size='none'
              onClick={() => fileRef.current.click()}
            >
              <Image src={Icons.paperclip} alt='attachment' width={25} />
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
