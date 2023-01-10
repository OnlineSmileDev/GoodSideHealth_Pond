import React from 'react'
import { Card, Image, Button } from 'react-bootstrap'
import { Timer } from 'components/atoms/Timer'
import Icons from '../../assets/icons'
import Images from '../../assets/images'
import { selectUserDetails } from '../Users'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { useFeatureWithOrg, useMedia } from '../../hooks'
import { actions } from './visitItem.slice'
import { VISIT_ITEM_MODALS } from '../visitItemModals/visitItemModal.constants'
import VideoInvitationCard from './VideoInvitationCard'
const { setSelectedVisitItemModal } = actions

const VIDEO_PARTICIPANTS_LIMIT = 4
const FIRST_POSITION = 0

const videoWindowSizes = {
  ipadPortrait: [600, 600],
  ipadLandscape: [1200, 800],
}

const VideoCard = ({ visit }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUserDetails)
  const { organizationId } = user
  const isShareVideoCardEnabled = useFeatureWithOrg(
    'shareVideoLink',
    organizationId
  )
  const isMinIpadLandScape = useMedia({ minWidth: 769 })
  const { ipadPortrait, ipadLandscape } = videoWindowSizes
  const role = user.role?.toLowerCase()
  const [width, height] = isMinIpadLandScape ? ipadLandscape : ipadPortrait
  const videoUrl = visit?.session?.videoUrl
  const { participants: videoParticipants, id: videoCallId } =
    visit?.videoCall || {}

  const otherUserIndex = videoParticipants?.findIndex(
    (each) => parseInt(each.id) !== user.id
  )

  const isUserVideoVisitParticipant = videoParticipants?.some(
    (each) => parseInt(each.id) === user.id
  )

  const isVideoParticipantsMaximum =
    videoParticipants?.length === VIDEO_PARTICIPANTS_LIMIT

  const isVideoInProgress = videoParticipants?.length > 1

  const isVideoVisitWaiting =
    !videoParticipants?.length ||
    (!isVideoInProgress && isUserVideoVisitParticipant)

  const handleVideoChat = () =>
    window
      .open(
        `${videoUrl}`,
        'Popup Window',
        `width=${width}, height=${height}, top=70, left=100, resizable=1, menubar=yes`
      )
      .focus()

  const getNameInitial = (name) =>
    name &&
    name
      .split(',')
      [FIRST_POSITION].split(' ')
      .map((each) => each[FIRST_POSITION])
      .join('')

  const getUserDetails = ({ name, credentials }) =>
    name + `${credentials ? `, ${credentials}` : ''}`
  return (
    <Card className='border-0 shadow-sm mb-20'>
      <Card.Body className='p-20'>
        <div className='d-flex'>
          <div className='user-thumb mr-30'>
            <div className='thumb-circle bg-primary d-flex align-items-center justify-content-center rounded-circle position-relative'>
              <span
                className={classNames('text-white', {
                  'f-16': isVideoVisitWaiting,
                  'f-28': !isVideoVisitWaiting,
                })}
              >
                {isVideoVisitWaiting ? (
                  <Timer initialTime={visit.createdAt} />
                ) : isVideoInProgress ? (
                  <Image alt='logo' src={Images.logoCircle}></Image>
                ) : (
                  `${getNameInitial(videoParticipants?.[otherUserIndex].name)}`
                )}
              </span>
              <div className='user-status position-absolute d-flex align-items-center justify-content-center rounded-circle'>
                <Image src={Images.logoLarge} width='17' alt='logoLarge' />
              </div>
            </div>
          </div>
          <div className='flex-fill'>
            <h4 className='f-16 hind lh-30 mb-1 font-weight-bold e2e-video-visit-text'>
              {isVideoVisitWaiting
                ? 'Waiting on other party to Join...'
                : isVideoInProgress
                ? 'Video visit in progress'
                : `${getUserDetails(
                    videoParticipants[otherUserIndex]
                  )} Has Joined the Visit`}
            </h4>
            <p className='f-14 mb-10'>
              Join the video visit or share your authenticated link.
            </p>
            <Button
              className={`w-180 f-12 font-weight-bold d-inline-flex align-items-center px-20 pendo-video-visit-button-${role}`}
              variant='primary'
              size='sm'
              onClick={handleVideoChat}
              disabled={isVideoParticipantsMaximum}
            >
              Open Video Visit
              <Image
                className='ml-auto'
                src={Icons.videoCameraIcon}
                width='20'
                alt='videoCamera-icon'
              />
            </Button>
            {isShareVideoCardEnabled && (
              <Button
                className='w-180 f-12 font-weight-bold d-inline-flex align-items-center px-20 ml-20'
                variant='light'
                size='sm'
                onClick={() =>
                  dispatch(
                    setSelectedVisitItemModal(
                      VISIT_ITEM_MODALS.SHARE_VIDEO_LINK
                    )
                  )
                }
              >
                Share Video Link
                <Image
                  className='ml-auto'
                  src={Icons.shareIcon}
                  width='20'
                  alt='share-icon'
                />
              </Button>
            )}
          </div>
        </div>
        <VideoInvitationCard
          videoCallId={videoCallId}
          videoParticipants={videoParticipants}
        />
      </Card.Body>
    </Card>
  )
}

export default VideoCard
