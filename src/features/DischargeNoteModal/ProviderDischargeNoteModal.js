import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LABEL_POSITIONS } from 'constants/general'
import { showModal } from '../../widgets/modal'
import SchoolExcuse from './SchoolExcuse'
import AddSummary from './AddSummary'
import Signature from './Signature'
import TemporaryPharmacy from './TemporaryPharmacy'
import Wizard from '../../widgets/Wizard'
import { actions } from '../VisitItem/visitItem.slice'
import { selectVisitDetails } from '../VisitItem/visitItem.selectors'
import { SCHOOL_EXCUSE } from './dischargeNoteModal.constants'
import {
  createDischargeVisit,
  updateDischargeVisit,
  fetchVisitDetails,
} from '../VisitItem/visitItem.asyncActions'

const { setSelectedDischargeNoteModal } = actions

const ProviderDischargeNote = () => {
  const dispatch = useDispatch()
  const {
    discharge,
    id,
    pharmacyAddress: visitDetailsPharmacyAddress,
  } = useSelector(selectVisitDetails)
  const resetModal = () => dispatch(setSelectedDischargeNoteModal(null))
  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const pages = [
    { label: 'School Excuse', component: SchoolExcuse },
    { label: 'Visit Summary', component: AddSummary },
    { label: 'Pharmacy', component: TemporaryPharmacy },
    { label: 'eSignature', component: Signature },
  ]
  const getInitialFormValues = () => {
    // TODO- Add Other as well
    if (discharge) {
      const {
        otherNote,
        providerVisitSummary,
        providerSignature,
        providerSignatureDateTime,
        mayReturn,
        mayReturnWhenFeverFree,
        pcpNote,
        pharmacyAddress,
        // pharmacyAddress2,
        // pharmacyCity,
        // pharmacyLatitude,
        // pharmacyLongitude,
        // pharmacyName,
        // pharmacyState,
        // pharmacyZipcode,
        medicationInformation,
        otherMedicationPrescribed,
        antibioticsPrescribed,
      } = discharge

      let schoolExcuse
      if (mayReturn) schoolExcuse = SCHOOL_EXCUSE.TODAY
      if (mayReturnWhenFeverFree) schoolExcuse = SCHOOL_EXCUSE.FEVER
      if (otherNote && !mayReturn && !mayReturnWhenFeverFree)
        schoolExcuse = SCHOOL_EXCUSE.OTHER
      if (!otherNote && !mayReturn && !mayReturnWhenFeverFree)
        schoolExcuse = SCHOOL_EXCUSE.PROVIDER
      // const pharmacy = {
      // 	address: {
      // 		streetNumber: pharmacyAddress,
      // 		streetName: pharmacyAddress2,
      // 		municipality: pharmacyCity,
      // 		countrySubdivision: pharmacyState,
      // 		postalCode: pharmacyZipcode,
      // 	},
      // 	poi: {
      // 		name: pharmacyName,
      // 	},
      // 	position: {
      // 		lat: pharmacyLatitude,
      // 		lon: pharmacyLongitude,
      // 	},
      // }
      return {
        otherInstructions: otherNote,
        providerVisitSummary,
        providerSignatureDateTime,
        providerSignature,
        schoolExcuse,
        providerInstructions: pcpNote,
        pharmacyAddress,
        medicationInformation,
        otherMedicationPrescribed,
        antibioticsPrescribed,
      }
    } else
      return {
        pharmacyAddress: visitDetailsPharmacyAddress ?? '',
      }
  }

  const onFinalize = (formValues, resetWizard) => {
    // TODO: Remap school excuse constants to fit the provider values
    // TODO: Remap components to be dynamic in naming?
    const dischargedVisit = {
      otherNote: formValues?.otherInstructions ?? '',
      mayReturn: formValues?.schoolExcuse === SCHOOL_EXCUSE.TODAY,
      mayReturnWhenFeverFree: formValues?.schoolExcuse === SCHOOL_EXCUSE.FEVER,
      providerVisitSummary: formValues?.providerVisitSummary,
      providerSignature: formValues?.providerSignature,
      providerSignatureDateTime: formValues?.providerSignatureDateTime,
      pcpNote: formValues?.providerInstructions ?? '',
      visitId: id,
      pharmacyAddress: formValues?.pharmacyAddress ?? '',
      // pharmacyAddress: formValues?.pharmacy?.address?.streetNumber,
      // pharmacyAddress2: formValues?.pharmacy?.address?.streetName,
      // pharmacyCity: formValues?.pharmacy?.address?.municipality,
      // pharmacyLatitude: Number(formValues?.pharmacy?.position?.lat),
      // pharmacyLongitude: Number(formValues?.pharmacy?.position?.lon),
      // pharmacyName: formValues?.pharmacy?.poi?.name,
      // pharmacyState: formValues?.pharmacy?.address?.countrySubdivisionName,
      // pharmacyZipcode: formValues?.pharmacy?.address?.postalCode,
      medicationInformation: formValues?.medicationInformation ?? '',
      otherMedicationPrescribed: Boolean(formValues?.otherMedicationPrescribed),
      antibioticsPrescribed: Boolean(formValues?.antibioticsPrescribed),
    }
    dispatch(
      !discharge
        ? createDischargeVisit({ dischargedVisit })
        : updateDischargeVisit({
            id: discharge?.id,
            dischargedVisit,
          })
    ).then(() => {
      dispatch(fetchVisitDetails({ visitId: id }))
      resetWizard()
      resetModal()
    })
  }

  return (
    <Wizard
      pages={pages}
      onFinalize={onFinalize}
      onCancel={resetModal}
      title='Discharge Note'
      finalButtonText='Complete'
      labelPosition={LABEL_POSITIONS.TOP}
      initialFormData={getInitialFormValues()}
      onClose={false}
      utilityClass={
        'pendo-discharge-modal-submit-button-provider e2e-discharge-modal-submit-button-provider'
      }
    />
  )
}

export default ProviderDischargeNote
