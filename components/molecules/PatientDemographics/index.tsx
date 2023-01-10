import { useState } from 'react'
import { BadgeRound, BADGE_VARIANT } from 'components/atoms/BadgeRound'
import Disclosure, { TOGGLE_PLACEMENT } from 'components/molecules/Disclosure'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { Label } from 'components/atoms/Label'
import { Value } from 'components/atoms/Value'
import { ReadMoreField } from 'components/atoms/ReadMoreField'
import { isAgeIsGreaterThan21 } from 'src/helpers/dobFormatter'
import { MAJOR_PATIENT_AGE } from 'constants/patients'
import { convertDateToUTCWithFullMonth } from 'utils/datePicker'

export type PatientDemographicsProps = {
  name: string
  dateOfBirth: string
  allergies: string
  primaryLanguage: string
  knownMedications: string
  knownConditions: string
  // handleEdit: (value: any) => void
}

export const PatientDemographics = ({
  name,
  dateOfBirth,
  allergies,
  primaryLanguage,
  knownMedications,
  knownConditions,
}: PatientDemographicsProps) => {
  const [activeKey, setActiveKey] = useState({ patientDemographics: true })
  const [readMore, setReadMore] = useState({
    allergies: false,
    knownMedications: false,
  })

  const header = (
    <div className='tw-w-full tw-flex tw-justify-between tw-items-center tw-text-lg tw-font-hind tw-font-bold'>
      {name}
      <Button
        variant={BUTTON_VARIANT.LIGHTEST}
        size='none'
        className='tw-text-primary'
        onClick={() => console.log('edit')}
      >
        Edit
      </Button>
    </div>
  )

  return (
    <div className='tw-mb-7'>
      <Disclosure defaultActiveKey='patientDemographics'>
        <Disclosure.Body
          eventKey='patientDemographics'
          header={header}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          togglePlacement={TOGGLE_PLACEMENT.FOOTER}
          toggleLabel={
            activeKey.patientDemographics ? 'Less Details' : 'View More'
          }
        >
          <>
            <div className='tw-grid tw-grid-cols-1 tw-my-1.25'>
              <Label>Date of Birth</Label>
              <Value>
                {isAgeIsGreaterThan21(dateOfBirth) && (
                  <BadgeRound variant={BADGE_VARIANT.WARNING}>
                    {MAJOR_PATIENT_AGE}+
                  </BadgeRound>
                )}
                {convertDateToUTCWithFullMonth(dateOfBirth)}
              </Value>
            </div>
            <div className='tw-grid tw-grid-cols-1 tw-my-1.25'>
              <Label>Allergies</Label>
              <Value>
                <ReadMoreField
                  fieldName='allergies'
                  fieldData={allergies || 'N/A'}
                  readMore={readMore}
                  setReadMore={setReadMore}
                />
              </Value>
            </div>
            <div className='tw-grid tw-grid-cols-1 tw-my-1.25'>
              <Label>Primary Language</Label>
              <Value>{primaryLanguage}</Value>
            </div>
            <div className='tw-grid tw-grid-cols-1 tw-my-1.25'>
              <Label>Known Medications</Label>
              <Value>
                <ReadMoreField
                  fieldName='knownMedications'
                  fieldData={knownMedications || 'N/A'}
                  readMore={readMore}
                  setReadMore={setReadMore}
                />
              </Value>
            </div>
            <div className='tw-grid tw-grid-cols-1 tw-my-1.25'>
              <Label>Known Conditions</Label>
              <Value className='tw-text-sm tw-font-hind tw-py-0.5'>
                {knownConditions || 'N/A'}
              </Value>
            </div>
          </>
        </Disclosure.Body>
      </Disclosure>
    </div>
  )
}
