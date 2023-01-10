import React from 'react'
import { Button, ButtonProps, BUTTON_VARIANT } from 'components/atoms/Button'

export type CustomFooterButtonProps = { buttonText?: string } & ButtonProps

export type ModalFooterProps = {
  submitButtonProps: CustomFooterButtonProps
  cancelButtonProps: CustomFooterButtonProps
}

const ModalFooter = ({
  submitButtonProps: {
    buttonText: submitButtonText,
    variant: submitButtonVariant,
    ...submitProps
  },
  cancelButtonProps: {
    buttonText: cancelButtonText,
    variant: cancelButtonVariant,
    ...cancelProps
  },
}: ModalFooterProps) => (
  <div>
    <Button
      {...submitProps}
      type='submit'
      variant={submitButtonVariant || BUTTON_VARIANT.SUCCESS}
      size='lg'
      className='tw-mr-5'
    >
      {submitButtonText || 'Save'}
    </Button>
    <Button
      {...cancelProps}
      variant={cancelButtonVariant || BUTTON_VARIANT.LIGHT}
      size='sm'
    >
      {cancelButtonText || 'Cancel'}
    </Button>
  </div>
)

export default ModalFooter
