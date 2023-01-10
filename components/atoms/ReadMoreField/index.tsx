import React from 'react'
import Image from 'react-bootstrap/Image'
import Icons from '../../../src/assets/icons'

const VALUE_TO_DISPLAY = 2
const FIRST_VALUE = 0
const SECOND_VALUE = 1

export type ReadMoreFieldProps = {
  fieldName: string
  fieldData: string
  readMore: {}
  setReadMore: (value: {}) => void
  testClassName?: string
}

export const ReadMoreField = ({
  fieldName,
  fieldData,
  readMore,
  setReadMore,
  testClassName,
}: ReadMoreFieldProps) => {
  const fieldDataArray = (string) => string.split(' ')

  const fieldDataToDisplay = (string, field) =>
    field
      ? fieldData
      : `${fieldDataArray(string)[FIRST_VALUE]} ${
          fieldDataArray(string)[SECOND_VALUE]
        }`
  return (
    <>
      {/* // TODO: Leaving this here since we might go back to this */}
      {/* {(fieldData &&
				fieldDataToDisplay(fieldData, readMore[`${fieldName}`]).map((each) => (
					<span key={each}>{each}</span>
				))) ||
				'N/A'} */}
      <span className={testClassName}>
        {(fieldData &&
          (fieldDataArray(fieldData).length > VALUE_TO_DISPLAY
            ? fieldDataToDisplay(fieldData, readMore[`${fieldName}`])
            : fieldData)) ||
          'N/A'}
      </span>
      {fieldData && fieldDataArray(fieldData).length > VALUE_TO_DISPLAY && (
        <>
          <div
            className='tw-ml-1 btn-auto tw-p-0 tw-font-hind tw-font-bold tw-text-xs tw-decoration-0 tw-text-pondBlack-lighter tw-opacity-50 tw-cursor-pointer tw-inline-block'
            onClick={() =>
              setReadMore({ [`${fieldName}`]: !readMore[`${fieldName}`] })
            }
          >
            {readMore[`${fieldName}`] ? 'Read Less' : 'Read More'}
            <Image
              alt={readMore[`${fieldName}`] ? 'Up Arrow' : 'Down Arrow'}
              src={
                readMore[`${fieldName}`]
                  ? Icons.blackUpArrowIcon
                  : Icons.blackDownArrowIcon
              }
              className='tw-ml-2'
              width='9'
            />
          </div>
        </>
      )}
    </>
  )
}
