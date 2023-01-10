import { Badge, BADGE_OUTLINE_VARIANT } from 'components/atoms/Badge'
import { ArchiveTable } from 'components/molecules/ArchiveTable'
import { SortingCustomIcon } from 'components/atoms/Table'
import { getDateFromIsoString } from 'utils/datePicker'
import { PatientListSkeleton } from './skeleton'

//Some gnarly prop drilling here
export type PatientListProps = {
  patients: Array<any>
  selectedPatients: Array<any>
  setSelectedPatients: (value: Array<any>) => void
  nonSelectable: Array<string>
}

const statusFormatter = (status, row) => (
  <div className='tw-flex'>
    <Badge
      variant={
        status === 'completed'
          ? BADGE_OUTLINE_VARIANT.OUTLINE_SUCCESS
          : BADGE_OUTLINE_VARIANT.OUTLINE_WARNING
      }
      className='tw-h-6.25 tw-w-33.5 tw-p-0.75'
      data-testid='patients'
    >
      <p className='tw-font-hind tw-font-bold tw-text-xs'>
        {status === 'completed' ? 'Registered' : 'Incomplete WCP'}
      </p>
    </Badge>
  </div>
)

const nameFormatter = (cell, row) => `${row.firstName} ${row.lastName}`
const dobFormatter = (cell, row) => getDateFromIsoString(cell)

const columns = [
  {
    dataField: 'name',
    text: 'Name',
    sort: false,
    formatter: nameFormatter,
    sortCaret: SortingCustomIcon,
    formatExtraData: 'isDarkCaret',
  },
  {
    dataField: 'dateOfBirth',
    text: 'DOB',
    sort: false,
    formatter: dobFormatter,
    sortCaret: SortingCustomIcon,
    formatExtraData: 'isDarkCaret',
  },
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
    sortCaret: SortingCustomIcon,
    formatExtraData: 'isDarkCaret',
  },
  // {
  //   dataField: 'status',
  //   text: 'Status',
  //   sort: true,
  //   sortCaret: SortingCustomIcon,
  //   formatter: statusFormatter,
  //   formatExtraData: 'isDarkCaret',
  // },
]

export const PatientList = ({
  patients,
  selectedPatients,
  setSelectedPatients,
  nonSelectable,
}) => {
  return (
    <div className='tw-overflow-hidden'>
      {/* ToDo: Add data-testid to the table to enable interaction test usage */}
      <ArchiveTable
        keyField='id'
        rowDataTestId='patient-list'
        columns={columns}
        data={patients}
        selectedRows={selectedPatients}
        nonSelectable={nonSelectable}
        selectColumnPosition='right'
        hideSelectAll={true}
        setSelectedRows={(value) => {
          setSelectedPatients(value)
        }}
      />
    </div>
  )
}

PatientList.Skeleton = PatientListSkeleton
