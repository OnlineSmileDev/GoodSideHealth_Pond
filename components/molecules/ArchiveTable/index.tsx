import React, { ReactNode } from 'react'
import { Image } from 'react-bootstrap'
import { Table } from 'components/atoms/Table'
import Icons from 'src/assets/icons'

export type ArchiveTableProps = {
  keyField: string
  columns: Array<any>
  rowDataTestId?: string
  data: Array<any>
  nonSelectable?: Array<any>
  selectedRows: Array<any>
  setSelectedRows: (value: Array<any>) => void
  hideSelectAll: boolean
  selectColumnPosition: string
}

export const ArchiveTable = ({
  keyField,
  rowDataTestId,
  columns,
  data,
  nonSelectable,
  selectedRows,
  setSelectedRows,
  hideSelectAll = false,
  selectColumnPosition = 'left',
}: ArchiveTableProps) => {
  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelectedRows([...selectedRows, row])
    } else {
      setSelectedRows(selectedRows.filter((x) => x[keyField] !== row[keyField]))
    }
  }

  const handleOnSelectAll = (isSelect, rows) => {
    if (isSelect) {
      setSelectedRows([...selectedRows, ...rows])
    } else {
      setSelectedRows(
        selectedRows.filter(
          (x) => !data.some((each) => each[keyField] === x[keyField])
        )
      )
    }
  }

  const getSelectedRowIds = (object) => {
    let selectedId = []
    if (object) {
      selectedId = object.reduce((acc, { id }) => {
        acc.push(id)
        return acc
      }, [])
    }
    return selectedId
  }

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    nonSelectable: nonSelectable,
    nonSelectableClasses: 'nonselectable',
    nonSelectableStyle: () => {
      return { backgroundColor: '#eee' }
    },
    selected: getSelectedRowIds(selectedRows),
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
    selectColumnPosition: selectColumnPosition,
    hideSelectAll: hideSelectAll,
    bgColor: '#ECFFDC',
    // eslint-disable-next-line react/display-name
    selectionHeaderRenderer: ({ mode, ...rest }) => (
      <div className='custom-checkbox d-block'>
        <label>
          <input type={mode} {...rest} />
          <span></span>
        </label>
      </div>
    ),
    // eslint-disable-next-line react/display-name
    selectionRenderer: ({ mode, rowKey, rowIndex, ...rest }) => (
      <div className='add-checkbox d-block'>
        <div className='tw-flex tw-justify-end'>
          <input
            type={mode}
            className='d-none'
            //@ts-ignore
            rowkey={rowKey}
            rowindex={rowIndex}
            readOnly
            {...rest}
          />
          <span>
            <Image src={Icons.greenCheck} className='check-icon' alt='trash' />
            <Image src={Icons.blackAdd} className='add-icon' alt='add' />
          </span>
        </div>
      </div>
    ),
  }

  return (
    <Table
      keyField={keyField}
      columns={columns}
      data={data}
      selectRow={selectRow}
      isLightBg={true}
      isLessHeaderHeight={true}
      rowClasses={rowDataTestId} // cannot add custom attribute to boostrap table yet
    />
  )
}
