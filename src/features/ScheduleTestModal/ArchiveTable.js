import React from 'react'
import { Table } from 'components/atoms/Table'

const ArchiveTable = ({
  keyField,
  columns,
  data,
  selected,
  selectedRows,
  setSelectedRows,
  hideSelectAll = false,
  noDataIndication,
}) => {
  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelectedRows([...selectedRows, row])
    } else {
      setSelectedRows(selectedRows.filter((x) => x.id !== row.id))
    }
  }

  const handleOnSelectAll = (isSelect, rows) => {
    if (isSelect) {
      setSelectedRows([...selectedRows, ...rows])
    } else {
      setSelectedRows(
        selectedRows.filter((x) => !data.some((each) => each.id === x.id))
      )
    }
  }

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    selected: selected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
    hideSelectAll: hideSelectAll,
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
    selectionRenderer: ({ mode, ...rest }) => (
      <div className='custom-checkbox d-block'>
        <label>
          <input type={mode} {...rest} />
          <span></span>
        </label>
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
      noDataIndication={
        <h5 className='f-12 font-weight-bold' data-test='no-data'>
          {noDataIndication}
        </h5>
      }
    />
  )
}

export default ArchiveTable
