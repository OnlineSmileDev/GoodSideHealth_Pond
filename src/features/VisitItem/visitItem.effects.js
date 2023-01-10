import {
  fetchVisitDetails,
  fetchVisitActivities,
  fetchVideoInvitations,
} from './visitItem.asyncActions'
import useAuthQuery from '../../infrastructure/useAuthQuery'

export const useFetchVisitItems = (id) =>
  useAuthQuery({
    name: 'visitDetails',
    url: `visits/${id}`,
    action: fetchVisitDetails,
  })

export const useFetchVisitActivity = (visitId) =>
  useAuthQuery({
    name: 'visitActivity',
    url: `sessionLogs?visitId=${visitId}`,
    action: fetchVisitActivities,
  })

export const useFetchVideoInvitations = (videoCallId) =>
  useAuthQuery({
    name: 'videoInvitations',
    url: `invitations/video?videoCallId=${videoCallId}`,
    action: fetchVideoInvitations,
  })
