import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Form, Row, Button, Image } from 'react-bootstrap'
import { DEBOUNCE_TIMEOUT, REG_DATE_INPUT } from 'constants/general'
import { SortingCustomIcon } from 'components/atoms/Table'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { getDateFromIsoString, getBackendFormattedDate } from 'utils/datePicker'
import { isEmpty } from 'utils/isEmpty'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { fetchLocationPatients } from '../VisitItem/visitItem.asyncActions'
import {
  selectPatients,
  selectSelectedLocation,
} from '../VisitItem/visitItem.selectors'
import ArchiveTable from './ArchiveTable'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'
import Icons from '../../assets/icons'
import { useDebounce } from '../../hooks'

const { setIsCurrentPageValid, setFormValues } = actions

const SelectPatient = () => {
  const dispatch = useDispatch()
  const debounce = useDebounce()
  const wizardForm = useSelector(selectWizardFormValues)
  const patients = useSelector(selectPatients)
  const selectedLocation = useSelector(selectSelectedLocation)
  const [selectedRows, setSelectedRows] = useState([])
  const [searchedValue, setSearchedValue] = useState('')
  const show = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_LOCATION_PATIENTS)
  )

  useEffect(() => {
    dispatch(
      fetchLocationPatients({
        locationId: selectedLocation.id || wizardForm.locationId,
        organizationId:
          selectedLocation.organizationId || wizardForm.organizationId,
        value: searchedValue,
      })
    )
  }, [
    dispatch,
    selectedLocation.id,
    selectedLocation.organizationId,
    searchedValue,
    wizardForm.locationId,
    wizardForm.organizationId,
  ])

  useEffect(() => {
    !isEmpty(wizardForm.patients)
      ? dispatch(setIsCurrentPageValid(true))
      : dispatch(setIsCurrentPageValid(false))
    if (wizardForm.patients && isEmpty(selectedRows)) {
      setSelectedRows(wizardForm.patients)
    }
  }, [dispatch, wizardForm, wizardForm.patients, selectedRows])

  const handleChange = (data) => {
    dispatch(setIsCurrentPageValid(!!data))
    dispatch(setFormValues({ patients: data }))
  }

  const handleSearch = (ev) => {
    const value = ev.target.value
    const isDateInput = REG_DATE_INPUT.test(value)
    if (isDateInput) {
      if (value.length === 10) {
        setSearchedValue(getBackendFormattedDate(value))
      }
    } else {
      debounce(() => setSearchedValue(value), DEBOUNCE_TIMEOUT)
    }
  }
  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
    },
    {
      dataField: 'dateOfBirth',
      text: 'DOB',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
    },
    {
      dataField: 'studentId',
      text: 'ID',
      sort: true,
      sortCaret: SortingCustomIcon,
      formatExtraData: 'isDarkCaret',
    },
  ]
  const getSelectedRecordId = (object) => {
    var selectedId
    if (object) {
      selectedId = object.reduce((acc, { id }) => {
        acc.push(id)
        return acc
      }, [])
    }
    return selectedId
  }

  const getFormattedName = (patient) =>
    `${patient.firstName} ${patient.lastName}`

  const formattedPatients = patients.map((patient) => ({
    ...patient,
    name: getFormattedName(patient),
    dateOfBirth: getDateFromIsoString(patient.dateOfBirth),
  }))

  return (
    <div className='border-bottom border-dark overflow-hidden mb-30'>
      <Row noGutters className='table-height'>
        <Col className='border-right border-dark border-top'>
          <div className='overflow-hidden'>
            <div className='py-20'>
              <div className='px-3'>
                <p className='f-14 mb-30'>
                  Please select the patient(s) requiring a test using the field
                  below.
                </p>
                <Form.Group className='mb-3 lg-0 mb-30'>
                  <Form.Control
                    className='search-control'
                    type='text'
                    placeholder='Search by Name, DOB or ID'
                    onChange={handleSearch}
                  />
                </Form.Group>
              </div>
              <div className='scrollbar'>
                {show ? (
                  <Image
                    src={Icons.loadingIcon}
                    className='archive-spinner'
                    alt='Loading...'
                  />
                ) : (
                  <ArchiveTable
                    keyField='id'
                    columns={columns}
                    data={formattedPatients}
                    selected={getSelectedRecordId(wizardForm.patients)}
                    selectedRows={selectedRows}
                    setSelectedRows={(value) => {
                      handleChange(value)
                      setSelectedRows(value)
                    }}
                    noDataIndication={`No Patient Match found at ${selectedLocation.name}`}
                  />
                )}
              </div>
            </div>
          </div>
        </Col>

        <Col md={5}>
          <div className='border-top border-dark overflow-hidden'>
            <div className='py-10'>
              <div className='d-flex mb-20 px-3'>
                <h5 className='opacity-50 mb-0 f-14 font-weight-bold lh-25'>
                  {!isEmpty(wizardForm.patients)
                    ? wizardForm.patients.length
                    : 0}
                  <span className='ml-1'>Selected Patients </span>
                </h5>
                <Button
                  variant='light'
                  className='btn-small btn-30 ml-auto'
                  onClick={() => {
                    dispatch(setFormValues({ patients: [] }))
                    setSelectedRows([])
                  }}
                >
                  Clear All
                </Button>
              </div>

              {!isEmpty(wizardForm.patients) && (
                <div
                  className='scrollbar scroll-height'
                  data-test='selected-patients'
                >
                  <ArchiveTable
                    keyField='id'
                    columns={columns}
                    data={
                      !isEmpty(wizardForm.patients) ? wizardForm.patients : []
                    }
                    selected={getSelectedRecordId(
                      !isEmpty(wizardForm.patients) ? wizardForm.patients : []
                    )}
                    selectedRows={selectedRows}
                    setSelectedRows={(value) => {
                      handleChange(value)
                      setSelectedRows(value)
                    }}
                    hideSelectAll={true}
                    noDataIndication='No Patient Selected'
                  />
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default SelectPatient
