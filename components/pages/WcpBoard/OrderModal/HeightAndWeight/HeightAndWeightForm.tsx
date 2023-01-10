import { useEffect } from 'react'
import { Formik, useFormikContext } from 'formik'
import {
  number as YupNumber,
  string as YupString,
  object as YupObject,
  mixed as YupMixed,
} from 'yup'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { InputControl } from 'components/molecules/InputControl'
import { InputGroup } from 'components/molecules/InputGroup'
import { BloodPressureForm, BloodPressureReading } from './BloodPressureForm'
import { getBMI } from 'utils/bmi/getBMI'
import { getBMIPercentile } from 'utils/bmi/getBMIPercentile'
import { getBMIClassification, BMI_CLASS } from 'utils/bmi/getBMIClassification'
import { getAgeByMonth } from 'utils/bmi/getAgeByMonth'

const validationSchema = YupObject().shape({
  height_ft: YupString().required(),
  height_in: YupString().required(),
  weight_lbs: YupString().required(),
  pulse_bpm: YupString().required(),
  pressure_systolic: YupNumber().required(),
  pressure_diastolic: YupNumber().required(),
  bmi: YupNumber().required(),
  bmi_percentile: YupNumber().required(),
  date_of_birth: YupString().required(),
  birth_sex: YupMixed().oneOf(['Male', 'Female']).required(),
})

type VisitValuesType = {
  first_name?: string
  last_name?: string
  date_of_birth?: string
  birth_sex?: string
}

export type HeightAndWeightValuesType = {
  height_ft?: number
  height_in?: number
  weight_lbs?: number
  pulse_bpm?: number
  pressure_systolic?: number
  pressure_diastolic?: number
  bmi?: number
  bmi_percentile?: number
  date_of_birth?: string
  birth_sex?: string
}

export type HeightAndWeightFormProps = {
  visitValues?: VisitValuesType
  heightAndWeightValues: HeightAndWeightValuesType
  handleFormSubmission: (values: any, shouldBeFlagged: boolean) => void
  isUploading?: boolean
  isPreloading?: boolean
}

// lot easier to manage bmi fields which are dependent
const BMIField = () => {
  const { values, setFieldValue } =
    useFormikContext<HeightAndWeightValuesType>()

  const {
    height_ft,
    height_in,
    weight_lbs,
    birth_sex,
    date_of_birth,
    bmi,
    bmi_percentile,
  } = values

  useEffect(() => {
    const ageByMonth = getAgeByMonth(date_of_birth)
    const calculatedBMI = getBMI(+height_ft, +height_in, +weight_lbs)
    const calculatedBMIPercentile = getBMIPercentile(
      birth_sex,
      ageByMonth,
      calculatedBMI
    )
    setFieldValue('bmi', calculatedBMI)
    setFieldValue('bmi_percentile', calculatedBMIPercentile)
  }, [
    birth_sex,
    date_of_birth,
    height_ft,
    height_in,
    setFieldValue,
    weight_lbs,
  ])

  const bmiClassification = getBMIClassification(bmi_percentile)
  const bmiMessage = bmi
    ? `${bmi}/${bmi_percentile}% - ${bmiClassification}`
    : ''

  return (
    <InputGroup id='bmi' className='tw-item-center tw-mb-4' label='BMI'>
      <div className='tw-col-span-2'>
        <div className='tw-h-10 tw-text-sm tw-text-left tw-font-hind tw-flex tw-items-center tw-font-bold'>
          {bmiMessage || 'Input height and weight to calculate.'}
        </div>
      </div>
    </InputGroup>
  )
}

export const HeightAndWeightForm = ({
  visitValues = {},
  heightAndWeightValues = {},
  handleFormSubmission,
  isUploading,
  isPreloading,
}: HeightAndWeightFormProps) => {
  let date_of_birth =
    heightAndWeightValues.date_of_birth || visitValues.date_of_birth
  let birth_sex =
    heightAndWeightValues.birth_sex || visitValues.birth_sex || 'Unspecified'

  if (/^(M|m)/.test(birth_sex)) birth_sex = 'Male'
  else if (/^(F|f)/.test(birth_sex)) birth_sex = 'Female'

  const initialValues = {
    ...heightAndWeightValues,
    date_of_birth,
    birth_sex,
    bmi: 0,
    bmi_percentile: 0,
  }

  const onHeightAndWeightFormikSubmit = (
    values: HeightAndWeightValuesType,
    { setSubmitting }
  ) => {
    const shouldBeFlagged =
      getBMIClassification(values.bmi_percentile) !== BMI_CLASS.HEALTHY

    handleFormSubmission(values, shouldBeFlagged)
    setSubmitting(false)
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onHeightAndWeightFormikSubmit}
    >
      {({ values, handleBlur, handleSubmit, setFieldValue, isValid }) => (
        <form onSubmit={handleSubmit}>
          <InputGroup
            id='height'
            className='tw-item-center tw-mb-4'
            label='Height'
          >
            <div className='tw-col-span-2 tw-flex tw-items-center tw-font-hind tw-text-center '>
              <InputControl
                as='number'
                name='height_ft'
                value={values.height_ft}
                placeholder='5'
                className='tw-w-9 tw-mr-1 tw-flex-auto'
                maxLength={1}
                onValueChange={({ value }) => {
                  setFieldValue('height_ft', value)
                }}
                onBlur={handleBlur}
              />

              <div className='tw-mr-2'>ft</div>

              <InputControl
                as='number'
                name='height_in'
                value={values.height_in}
                placeholder='9'
                className='tw-w-9 tw-mr-1 tw-flex-auto'
                isAllowed={({ value }) => +value < 12}
                onValueChange={({ value }) => {
                  setFieldValue('height_in', value)
                }}
                onBlur={handleBlur}
              />

              <div>in</div>
            </div>
          </InputGroup>

          <InputGroup
            id='weight_lbs'
            className='tw-item-center tw-mb-4'
            label='Weight'
          >
            <div className='tw-col-span-2 tw-flex tw-items-center tw-font-hind tw-text-center'>
              <InputControl
                as='number'
                name='weight_lbs'
                value={values.weight_lbs}
                placeholder='175'
                className='tw-flex-auto'
                maxLength={3}
                onValueChange={({ value }) => {
                  setFieldValue('weight_lbs', value)
                }}
                onBlur={handleBlur}
              />

              <div className='tw-ml-1'>lbs</div>
            </div>
          </InputGroup>

          <div className='tw-flex tw-items-center tw-font-hind'>
            <InputGroup
              id='date_of_birth'
              className='tw-item-center tw-max-w-1/2 tw-mt-4 tw-pr-4 tw-flex-auto'
              label='Date Of Birth'
            >
              <InputControl
                as='date'
                name='date_of_birth'
                value={values.date_of_birth}
                placeholder='Date of Birth'
                className='tw-mr-1'
                setFieldValue={setFieldValue}
                onBlur={handleBlur}
              />
            </InputGroup>

            <InputGroup
              id='birth_sex'
              className='tw-item-center tw-mt-4 tw-pl-4 tw-flex-auto'
              label='Birth Sex'
            >
              <InputControl
                as='select'
                name='birth_sex'
                value={values.birth_sex}
                placeholder='Select Birth Sex'
                className='tw-mr-1'
                onChange={(evt) => {
                  setFieldValue('birth_sex', evt.target.value)
                }}
                onBlur={handleBlur}
              >
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Unspecified'>Unspecified</option>
              </InputControl>
            </InputGroup>
          </div>

          <BMIField />

          <InputGroup
            id='pulse_bpm'
            className='tw-item-center tw-mb-4'
            label='Pulse'
          >
            <div className='tw-col-span-2 tw-flex tw-items-center tw-font-hind tw-text-center'>
              <InputControl
                as='number'
                name='pulse_bpm'
                value={values.pulse_bpm}
                placeholder='70'
                className='tw-flex-auto'
                maxLength={3}
                onValueChange={({ value }) => {
                  setFieldValue('pulse_bpm', value)
                }}
                onBlur={handleBlur}
              />

              <div className='tw-ml-1'>bpm</div>
            </div>
          </InputGroup>

          <BloodPressureForm
            value={
              {
                pressure_systolic: values.pressure_systolic,
                pressure_diastolic: values.pressure_diastolic,
              } as BloodPressureReading
            }
            onValueChange={(value: BloodPressureReading) => {
              setFieldValue('pressure_systolic', value.pressure_systolic)
              setFieldValue('pressure_diastolic', value.pressure_diastolic)
            }}
            onBlur={handleBlur}
          />

          <div className='tw-flex tw-justify-end tw-w-full tw-mt-10 tw-mb-5'>
            <Button
              type='submit'
              variant={BUTTON_VARIANT.PRIMARY}
              disabled={!isValid || isPreloading}
              isLoading={isUploading}
              className='tw-mx-1.5 tw-text-sm tw-w-auto tw-flex-auto'
              size='lg'
              data-testid='submit-button'
            >
              Save
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}
