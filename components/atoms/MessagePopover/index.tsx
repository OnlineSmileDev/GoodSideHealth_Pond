import classNames from 'classnames'

export type MessagePopoverProps = {
  title: string
  isSent: boolean
  options: Array<any>
  setSelectedItem: (value: string) => void
}

export const MessagePopover = ({
  title,
  isSent,
  options,
  setSelectedItem,
}: MessagePopoverProps) => {
  return (
    <div className='tw-bg-light tw-absolute tw-w-full tw-z-50 tw-p-2 tw-bottom-full tw-mb-2'>
      <div
        className={classNames(
          'chat-dot-triangle',
          { 'tw-right-0': !isSent },
          { 'tw-left-0': isSent }
        )}
      />
      <div>
        <h4 className='tw-font-sans tw-px-2 tw-py-1 tw-font-bold tw-border-b tw-text-xs'>
          {title}
        </h4>
        {options.map(({ id, value, title }) => (
          <div
            className='tw-px-2 tw-py-1 tw-font-sans tw-text-xs tw-cursor-pointer hover:tw-bg-light-lighter'
            onClick={() => {
              setSelectedItem(value)
            }}
            key={id}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  )
}
