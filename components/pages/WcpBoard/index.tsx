import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useFeatures } from 'flagged'
import { KanbanBoard } from 'components/templates/KanbanBoard'
import { Page } from 'components/templates/Page'
import {
  useSessionStationsVisitsQuery,
  useUpdateVisitStationMutation,
} from 'graphql/.generated'
import StationVisitsSubscription from 'graphql/StationVisitsSubscription.graphql'
import useHasuraWebsocket from 'src/hooks/useHasuraWebsocket'
import { SwimLane } from 'components/organisms/SwimLane'
import { VISIT_ACTION_NAME } from 'constants/kanbanBoard'
import { useUpdateVisitMutation } from 'graphql/.generated'
import { OrderModal } from './OrderModal'
import { SelectedOrderType } from './OrderModal/types'

export function WcpBoard() {
  const router = useRouter()
  const session_id = +router.query.id

  const [session, setSession] = useState({
    id: session_id,
    name: '',
    stations: [],
  })

  const {
    isSubscribing,
    subscribe,
    unsubscribeAll,
    subscribedData,
    hasWebsocketError,
  } = useHasuraWebsocket(StationVisitsSubscription)

  const isUsingSubscriptions = !hasWebsocketError

  const { data, isFetched, isFetching, refetch } =
    useSessionStationsVisitsQuery(
      {
        session_id,
      },
      { enabled: false }
    )

  const { stations } = session
  const kanbanSession = {
    id: session.id,
    name: session.name,
  }

  const { mutate, isLoading, isSuccess, isError } =
    useUpdateVisitStationMutation()

  // for uil printing
  const { mutate: mutateVisit, isLoading: isMarkVisitPrintedLoading } =
    useUpdateVisitMutation()

  const handleMarkVisitPrinted = (visitId: number) =>
    mutateVisit({ visitId, objects: { has_uil_printed: true } })

  useEffect(() => {
    if (!isFetched && !isFetching) refetch()
  }, [isFetched, isFetching, refetch])

  // init hasura ws
  useEffect(() => {
    if (!isUsingSubscriptions || !session.stations.length) return

    const stationIds = session.stations.map((station) => ({
      key: `station-${station.id}`,
      variables: { station_id: station.id },
    }))

    subscribe(stationIds)
  }, [isUsingSubscriptions, subscribe, session.stations])

  useEffect(() => {
    if (!isUsingSubscriptions && isSubscribing) unsubscribeAll()
    else if (isSubscribing) return unsubscribeAll
  }, [isUsingSubscriptions, isSubscribing, unsubscribeAll])

  // handle data
  useEffect(() => {
    if (!data) return

    const initialSession = data?.sessions[0]
    const initialStations = initialSession?.stations

    setSession(({ stations: prevStations }) => {
      const stations = Object.keys(subscribedData).length
        ? prevStations.map((station) => {
            const stationData = subscribedData[`station-${station.id}`]
            return {
              ...station,
              ...(stationData && { station_visits: stationData }),
            }
          })
        : initialStations
      return { id: initialSession.id, name: initialSession?.name, stations }
    })
  }, [data, subscribedData])

  const emptyOrder = {
    title: '',
    code: '',
    orderTypes: [],
    visitId: null,
    patientName: '',
    patientId: '',
    show: false,
    currentStationId: null,
    nextStationId: null,
  }
  const [selectedOrder, setSelectedOrder] =
    useState<SelectedOrderType>(emptyOrder)

  // ToDo: replace that function
  const getNextElementId = (arr, idx) => (arr[++idx] ?? arr[0]).id
  const getPrevElementId = (arr, idx) => arr[--idx].id

  const { moveVisit } = useFeatures()

  return (
    <Page>
      <KanbanBoard
        session={kanbanSession}
        handlePatientManagement={() => router.push(`/search/${session_id}`)}
      >
        {stations?.map((station, index) => {
          const handleStationVisitAction = (
            visitId: number,
            patientName: string,
            patientId: string
          ) => {
            // TODO Add an additional field or rely on the station.code field at least.
            if (station.visit_action_name === VISIT_ACTION_NAME.VIEW_VISIT) {
              router.push(`/visit/wcp/${visitId}`)
            } else {
              setSelectedOrder({
                title: station.title,
                code: station.code,
                orderTypes: station.order_types,
                visitId,
                patientName,
                patientId,
                show: true,
                currentStationId: station.id,
                nextStationId: getNextElementId(stations, index),
              })
            }
          }

          const handleMoveNextStation = (
            visitId: number,
            currentStationId: number
          ) => {
            const newStationId = getNextElementId(stations, index)
            return mutate({
              visitId,
              oldStationId: currentStationId,
              newStationId,
            })
          }

          const handleMovePrevStation = (
            visitId: number,
            currentStationId: number
          ) => {
            const newStationId = getPrevElementId(stations, index)
            return mutate({
              visitId,
              oldStationId: currentStationId,
              newStationId,
            })
          }

          return (
            <SwimLane
              station={station}
              key={`swim-lane-${station.id}`}
              handleStationVisitAction={handleStationVisitAction}
              handleMoveNextStation={
                moveVisit ? handleMoveNextStation : undefined
              }
              handleMovePrevStation={
                moveVisit ? handleMovePrevStation : undefined
              }
              handleMarkVisitPrinted={handleMarkVisitPrinted}
            />
          )
        })}
      </KanbanBoard>

      <OrderModal
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
    </Page>
  )
}
