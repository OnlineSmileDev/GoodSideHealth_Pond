import React, { ReactNode } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import classNames from 'classnames'
import Image from 'react-bootstrap/Image'
import Icons from 'src/assets/icons'

export type TableProps = {
  bootstrap4?: boolean | undefined
  keyField: string
  data: Array<any>
  columns: Array<any>
  footerMargin?: boolean
  isLightBg?: boolean
  isWhiteBg?: boolean
  isLessHeaderHeight?: boolean
  isRoundedBorder?: boolean
  noVerticalSpace?: boolean
  isLightFont?: boolean
  isRightAlign?: boolean
  selectRow?: {}
  noDataIndication?: ReactNode
  rowClasses?: string // {rowDataTestId} : cannot add data-testid attribute to boostrap table yet
}

// import BusyIndicator from '../busyIndicator'
// TODO- Need to add named busySpinner here
export const Table = ({ ...props }: TableProps) => {
  return (
    <BootstrapTable
      {...props}
      wrapperClasses={`table-responsive ${props.footerMargin || ''}`}
      headerWrapperClasses={classNames('tw-font-semibold white-space-nowrap', {
        'tw-bg-light': props.isLightBg,
        'tw-bg-white': props.isWhiteBg,
        'tw-bg-primary tw-text-white': !props.isWhiteBg && !props.isLightBg,
        'td-p-10 th': props.isLessHeaderHeight,
      })}
      classes={classNames(
        'tw-text-15 tw-font-semibold tw-bg-white tw-drop-shadow-sm table-striped tw-mb-0',
        {
          'tw-border-none': props.isRoundedBorder,
          'table-td-y-0': props.noVerticalSpace,
          'td-12 light-td': props.isLightFont,
          'right-align': props.isRightAlign,
          'td-p-14 td ': props.isLessHeaderHeight,
        }
      )}
    />
  )
}

export const SortingCustomIcon = (order: string | undefined, row: any) => (
  <span className='order-arrow tw-flex tw-flex-col'>
    {(order === 'asc' || !order) && (
      <span className='arrow-up'>
        <Image
          src={
            row.formatExtraData === 'isDarkCaret'
              ? Icons.caretDarkIcon
              : Icons.caretIcon
          }
          alt='caret-icon'
          className='tw-opacity-100 upArrow'
          width='10'
        />
      </span>
    )}
    {(order === 'desc' || !order) && (
      <span className='arrow-down'>
        <Image
          src={
            row.formatExtraData === 'isDarkCaret'
              ? Icons.caretDarkIcon
              : Icons.caretIcon
          }
          alt='caret-icon'
          className='tw-opacity-100'
          width='10'
        />
      </span>
    )}
  </span>
)
