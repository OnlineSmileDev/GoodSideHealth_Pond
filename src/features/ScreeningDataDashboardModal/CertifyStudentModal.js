import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LABEL_POSITIONS } from 'constants/general'
import { showModal } from '../../widgets/modal'
import SelectLocation from '../RequestVisitModal/SelectLocation'
import SelectStudent from '../RequestVisitModal/SelectPatient'
import SubmitAssessment from './SubmitAssessment'
import AddStudent from './AddStudent'
import Wizard from '../../widgets/Wizard'
import { certifyStudentSubmission } from '../ScreeningDataDashboard/screeningDataDashboard.asyncActions'
import { actions } from '../ScreeningDataDashboard/screeningDataDashboard.slice'
import { selectUserDetails } from '../Users/users.selectors'

const { resetCertifyStudentForm, saveSelectedModal } = actions

const CertifyStudentModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const userDetails = useSelector(selectUserDetails)

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])
  const pages = [
    { label: 'Location', component: SelectLocation },
    { label: 'Student', component: SelectStudent },
    { label: 'Assessment', component: SubmitAssessment },
  ]

  const addStudentForm = { label: 'Student', component: AddStudent }

  const { firstName, lastName, email } = userDetails

  const onFinalize = (formValues, resetWizard) => {
    const { location, schoolId, symptoms, exposure, dateOfBirth, grade } =
      formValues
    const certifiedSubmission = {
      certifier: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: '',
      },
      screenings: [
        {
          location: location,
          schoolId: schoolId,
          firstName: formValues.firstName,
          symptoms: symptoms,
          exposure: exposure,
          dateOfBirth: dateOfBirth,
          grade: grade,
          lastName: formValues.lastName,
        },
      ],
    }
    dispatch(
      certifyStudentSubmission({ certifiedSubmission: certifiedSubmission })
    ).then((res) => {
      dispatch(resetCertifyStudentForm())
      resetWizard()
      dispatch(saveSelectedModal(null))
      onClose()
    })
  }

  return (
    <Wizard
      pages={pages}
      onFinalize={onFinalize}
      onCancel={onClose}
      title='Certify Student'
      finalButtonText='Complete Assessment'
      labelPosition={LABEL_POSITIONS.TOP}
      replaceablePage={addStudentForm}
    />
  )
}
export default CertifyStudentModal
