export type ErrorMessageProps = {
  errorMessage: string
}

export const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => (
  <div className='error-message tw-text-sm tw-font-hind'>{errorMessage}</div>
)
