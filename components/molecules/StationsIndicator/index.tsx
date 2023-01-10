import React from 'react'
import classNames from 'classnames'
import { STATION_STATUSES } from 'constants/stations'
import { StationType, VisitType } from 'constants/kanbanBoard'
import { useVisitOrdersQuery } from 'graphql/.generated'

export type StationsIndicatorProps = {
  visit: VisitType
  stations: Array<StationType>
}

export const StationsIndicator = (visit) => {
  const {
    visit: { id },
  } = visit

  const {
    data,
    isLoading: loading,
    error,
  } = useVisitOrdersQuery({
    visit_id: id,
  })

  const stations = data?.visits[0].orders.map((station) => {
    return station.status
  })

  const { COMPLETE, NOT_COMPLETE, SKIPPED, IN_PROGRESS, FAILED } =
    STATION_STATUSES

  return (
    <div className='tw-flex' data-testid='stationsIndicator'>
      {stations?.map((station, index) => (
        <div
          key={index}
          data-testid={index}
          className={classNames(
            'tw-w-1.25 tw-h-1.25 tw-mr-1.25 tw-rounded-full',
            { 'tw-bg-success': station === 'COMPLETE' },
            { 'tw-bg-warning': station === 'IN_PROGRESS' },
            { 'tw-bg-danger-darker': station === 'FAILED' },
            { 'tw-bg-pondBlack': station === 'NOT_COMPLETE' },
            { 'tw-bg-light': station === 'SKIPPED' }
          )}
        ></div>
      ))}
    </div>
  )
}
