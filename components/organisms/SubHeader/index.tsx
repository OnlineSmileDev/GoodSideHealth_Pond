import React from 'react'
import { Image } from 'react-bootstrap'
import { InputWidget } from 'components/molecules/InputWidget'
import { Card } from 'components/atoms/Card'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import icons from 'src/assets/icons'

export type SubHeaderProps = {
  title: string
  description?: string
  handlePatientManagement?: () => void
}

export const SubHeader = (SubHeaderOptions: SubHeaderProps) => {
  const { title, description, handlePatientManagement } = SubHeaderOptions

  return (
    <Card>
      <div className='tw-grid tw-grid-cols-1 tw-gap-y-3.5 lg:tw-grid-cols-2 '>
        <div>
          <div className='tw-text-base tw-font-hind tw-font-bold tw-text-pondBlack'>
            {title}
          </div>

          <div className='tw-text-sm tw-font-hind tw-font-bold tw-text-pondBlack tw-opacity-50'>
            {description}
          </div>
        </div>

        <div className='tw-flex tw-flex-col tw-justify-start lg:tw-justify-end sm:tw-flex-row'>
          <div className='tw-w-full lg:tw-w-87.5'>
            <InputWidget
              as='search'
              type='text'
              name='subHeaderSearch'
              className='search-control-black'
              placeholder='Search by Name, Date of Birth or ID'
            />
          </div>

          {/* Patient Management */}
          <Button
            variant={BUTTON_VARIANT.LIGHT}
            className='tw-w-full tw-mt-3.5 sm:tw-ml-3.5 sm:tw-w-15.1 sm:tw-mt-0 '
            onClick={handlePatientManagement}
          >
            <div className='tw-flex tw-items-center tw-justify-center'>
              <Image src={icons.addUser} width='18' alt='Add User' />
            </div>
          </Button>

          {/* ADD FACILITATOR BUTTON */}
          {/* <Button
            variant={BUTTON_VARIANT.LIGHT}
            className='tw-w-full tw-mt-3.5 sm:tw-ml-3.5 sm:tw-w-15.1 sm:tw-mt-0'
            onClick={() => console.log('Manage Facilitator')}
          >
            <div className='tw-flex tw-items-center tw-justify-center'>
              <Image src={icons.settings} width='20' alt='Settings' />
            </div>
          </Button> */}

          <Button
            variant={BUTTON_VARIANT.PRIMARY}
            className='tw-w-full tw-mt-3.5 sm:tw-ml-3.5 sm:tw-w-37.5 sm:tw-mt-0'
            onClick={() => console.log('End Session')}
          >
            End Session
          </Button>
        </div>
      </div>
    </Card>
  )
}
