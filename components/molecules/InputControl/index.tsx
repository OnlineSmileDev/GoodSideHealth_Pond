import { InputWidget, InputWidgetProps } from '../InputWidget'

export type CustomInputControlProps = {
  errorMessage?: string
}

export type InputControlProps = InputWidgetProps & CustomInputControlProps

export const InputControl = ({
  errorMessage,
  className,
  ...props
}: InputControlProps) => {
  return (
    <>
      <div className={className}>
        <InputWidget errorMessage={errorMessage} {...props} />
        {errorMessage ? (
          <div className='error-message' data-testid='error-message'>
            {errorMessage}
          </div>
        ) : null}
      </div>
    </>
  )
}
