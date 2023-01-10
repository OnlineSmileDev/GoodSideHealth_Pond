import React from 'react'
import { Image } from 'react-bootstrap'
import Icons from '../../assets/icons'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from './visitItem.slice'
import { selectVideoInvitations } from './visitItem.selectors'
import { VISIT_ITEM_MODALS } from '../visitItemModals/visitItemModal.constants'
import { useFetchVideoInvitations } from './visitItem.effects'
import { withFeature } from 'flagged'
const { setSelectedVisitItemModal, setSelectedInvitation } = actions

const VideoInvitationCard = ({ videoCallId, videoParticipants }) => {
  const dispatch = useDispatch()
  const videoInvitations = useSelector(selectVideoInvitations)
  useFetchVideoInvitations(videoCallId)

  const handleClick = (invitation, modalName) => {
    dispatch(setSelectedVisitItemModal(modalName))
    dispatch(setSelectedInvitation({ ...invitation }))
  }
  return videoInvitations.length ? (
    <>
      <h4 className='f-14 font-bold my-10'>Guests</h4>
      <div className='card border-0 px-10 f-14 bg-light'>
        {videoInvitations.map((invitation) => (
          <div
            className='guests'
            key={invitation.id}
            data-test={`invitation-row-${invitation.invitee}`}
          >
            <p className='guest-name'>
              <span
                className={`${
                  videoParticipants?.some(({ id }) => id === invitation.id)
                    ? 'green'
                    : 'orange'
                }-dot`}
              ></span>
              {invitation.name}
            </p>
            <span data-test={`invitee-${invitation.invitee}`}>
              {invitation.invitee}
            </span>
            <div className='ml-auto'>
              <Image
                className='resend-icon'
                src={Icons.resendEmail}
                alt='resend-icon'
                onClick={() =>
                  handleClick(
                    invitation,
                    VISIT_ITEM_MODALS.RESEND_VIDEO_INVITATION
                  )
                }
              />
              <Image
                className='delete-icon'
                src={Icons.redTrash}
                alt='trash-icon'
                onClick={() =>
                  handleClick(
                    invitation,
                    VISIT_ITEM_MODALS.DELETE_VIDEO_INVITATION
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
    </>
  ) : null
}

export default withFeature('videoInvitation')(VideoInvitationCard)
