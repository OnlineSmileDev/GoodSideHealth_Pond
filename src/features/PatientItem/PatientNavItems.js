import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { useFeatures } from 'flagged'
import { Formik } from 'formik'
import CustomJSONForm from 'components/organisms/CustomJSONForm'
import { getInitialFormValues, getValidationSchema } from 'utils/customJsonForm'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { set } from 'utils/set'
import { isEmpty } from 'utils/isEmpty'
import PatientVisitActivity from './PatientVisitActivity'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'
import PatientItemSkeleton from '../Skeleton/PatientItemSkeleton'
import Schema from './Schema'
import { updatePatient } from './patientItem.asyncActions'
import { actions } from './patientItem.slice'
import { selectLocations, selectOrganizations } from './patientItem.selectors'
import { DETAILS_TYPE, NOTIFICATION_TEXT } from './patientItem.constants'

const { setPatientDetails } = actions

const PatientNavItems = ({
  activeNavItem,
  details,
  patientId,
  setNotification,
}) => {
  const dispatch = useDispatch()
  const { editPatientDetails } = useFeatures()
  const fetchPatientItemIndicator = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_PATIENT_ITEM)
  )
  const locations = useSelector(selectLocations)
  const organizations = useSelector(selectOrganizations)

  const formattedLocations = useMemo(
    () => locations?.map(({ name, id }) => ({ title: name, value: id })),
    [locations]
  )
  const formattedOrganizations = useMemo(
    () => organizations?.map(({ name, id }) => ({ title: name, value: id })),
    [organizations]
  )

  if (activeNavItem === DETAILS_TYPE.PATIENT_DETAILS) {
    set(
      Schema,
      'patient.details.properties.locationId.options',
      formattedLocations
    )
    set(
      Schema,
      'patient.details.properties.organizationId.options',
      formattedOrganizations
    )
  }

  return activeNavItem === DETAILS_TYPE.VISIT_ACTIVITY ? (
    <PatientVisitActivity activeNavItem={activeNavItem} />
  ) : (
    <Formik
      enableReinitialize={true}
      initialValues={getInitialFormValues(Schema[activeNavItem], details)}
      validationSchema={getValidationSchema(Schema[activeNavItem])}
      onSubmit={(values, { setSubmitting }) => {
        delete values.id
        dispatch(updatePatient({ patientId, updatedPatient: values })).then(
          ({ payload }) => {
            const isError = isEmpty(payload)
            setNotification({
              isError,
              text: isError
                ? NOTIFICATION_TEXT.ERROR
                : NOTIFICATION_TEXT.SUCCESS,
              show: true,
            })
            if (!isError) dispatch(setPatientDetails(values))
          }
        )

        setSubmitting(false)
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Row className='align-items-center mb-lg-n4 mb-sm-4'>
            {editPatientDetails && (
              <Col xl={2} lg={3} className='ml-auto'>
                <Button
                  variant='success'
                  type='submit'
                  className='btn-block f-12 hind font-weight-bold'
                >
                  Save
                </Button>
              </Col>
            )}
          </Row>

          {fetchPatientItemIndicator ? (
            <PatientItemSkeleton column={8} />
          ) : (
            <CustomJSONForm
              schema={Schema[activeNavItem]}
              readOnly={!editPatientDetails}
              setNotification={setNotification}
              errorNotification={NOTIFICATION_TEXT.VALIDATION_ERROR}
            />
          )}
        </Form>
      )}
    </Formik>
  )
}

export default PatientNavItems
