import React, { useState } from 'react'
import { Feature } from 'flagged'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import Disclosure, { DISCLOSURE_VARIANT } from 'components/molecules/Disclosure'
import { NoCostBadge } from 'components/atoms/NoCostBadge'
import { BadgeRound, BADGE_VARIANT } from 'components/atoms/BadgeRound'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { MAJOR_PATIENT_AGE, PATIENT_STATUS } from 'constants/patients'
import { capitalizeFirstLetterOfEachWord } from 'utils/capitalizeFirstLetterOfEachWord'
import { getFormattedDate } from 'utils/datePicker'
import { isAgeIsGreaterThan21 } from '../../../src/helpers/dobFormatter'
import { PatientArchiveSkeleton } from './skeleton'

export type PatientArchiveProps = {
  patients: Array<any>
  locations: Array<any>
  canRequestVisit: boolean
  setSelectedPatient: (value: any) => void
}

const PatientArchive = ({
  patients,
  locations,
  canRequestVisit,
  setSelectedPatient,
}: PatientArchiveProps) => {
  const router = useRouter()
  const [activeKey, setActiveKey] = useState({})

  const handlePatientView = (id) => router.push(`/patient/${id}`)

  return (
    <Disclosure>
      {patients.map((patient, key) => {
        const {
          id,
          firstName,
          lastName,
          dateOfBirth,
          programs,
          locationId,
          noCostVisit,
        } = patient

        const status = programs?.length
          ? PATIENT_STATUS.ACTIVE
          : PATIENT_STATUS.INACTIVE
        const location = locations.find(({ id }) => id === locationId)
        const locationName = location
          ? capitalizeFirstLetterOfEachWord(location?.name)
          : 'N/A'

        const header = (
          <>
            <div className='tw-py-1 lg:tw-w-1/4 md:tw-w-1/4 sm:tw-w-full'>
              <h5
                className='tw-font-bold tw-leading-6.5 tw-flex tw-items-center tw-text-base tw-mb-0.5'
                data-test={`patient-name-${key}`}
              >
                <Feature name='insuranceValidationBadge'>
                  {noCostVisit ? <NoCostBadge /> : null}
                </Feature>
                {isAgeIsGreaterThan21(dateOfBirth) && (
                  <BadgeRound variant={BADGE_VARIANT.WARNING}>
                    {MAJOR_PATIENT_AGE}+
                  </BadgeRound>
                )}
                {`${firstName} ${lastName}`}
              </h5>
            </div>
            <div className='tw-justify-self-center tw-py-1 tw-pl-4 lg:tw-w-1/5 md:tw-w-1/5 sm:tw-w-full'>
              <h5 className='tw-text-sm tw-font-hind sm:tw-mr-2 md:tw-mx-2 lg:tw-mx-2'>
                <strong>DOB:</strong> {getFormattedDate(dateOfBirth)}
              </h5>
            </div>
            <div className='tw-flex tw-flex-row tw-items-center tw-p-1 lg:tw-w-1/2 md:tw-w-1/2 sm:tw-w-full lg:tw-justify-end md:tw-justify-end sm:tw-justify-start'>
              <p className='tw-mx-2 tw-text-sm tw-font-hind'>{locationName}</p>
              {canRequestVisit && (
                <div className='tw-mx-1.5'>
                  <Button
                    variant={BUTTON_VARIANT.LIGHT}
                    className='tw-w-37.5 tw-h-7.5 pendo-request-visit-patient'
                    onClick={() => {
                      setSelectedPatient({
                        location,
                        patient,
                      })
                    }}
                    data-test={`request-visit-patient-button-${key}`}
                  >
                    Request Visit
                  </Button>
                </div>
              )}
              {/* PERMISSION:- Can READ/WRITE patient Details */}
              <div className='tw-ml-1.5'>
                {
                  <Feature name='patientDetails'>
                    <Button
                      variant={BUTTON_VARIANT.PRIMARY}
                      className='tw-w-17.5 tw-h-7.5 pendo-view-patient'
                      onClick={() => handlePatientView(id)}
                      data-test={`view-patient-button-${key}`}
                    >
                      View
                    </Button>
                  </Feature>
                }
              </div>
            </div>
          </>
        )

        return (
          <div className='tw-my-2.5' key={id} data-test='patient-card'>
            <Disclosure.Body
              eventKey={id}
              variant={
                status === 'Active'
                  ? DISCLOSURE_VARIANT.SUCCESS
                  : DISCLOSURE_VARIANT.DANGER
              }
              header={header}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
            >
              <div className='tw-mt-2.5'>
                <div className='tw-h-10 tw-pl-5 tw-flex tw-items-center'>
                  <strong className='tw-text-sm'>Programs</strong>
                </div>
                {programs.map(({ id, name }, index) => (
                  <div
                    className={classNames(
                      'tw-h-10 tw-flex tw-items-center',
                      { 'tw-bg-light-lightest': index % 2 === 1 },
                      { 'tw-bg-light': index % 2 === 0 }
                    )}
                    key={id}
                  >
                    <p className='tw-pl-5 tw-font-hind tw-text-sm'>{name}</p>
                  </div>
                ))}
              </div>
            </Disclosure.Body>
          </div>
        )
      })}
    </Disclosure>
  )
}

PatientArchive.Skeleton = PatientArchiveSkeleton
export default PatientArchive
