import { FC } from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import { ControllerRenderProps, RefCallBack } from 'react-hook-form'
import cn from 'classnames'

export interface SwitchProps extends Omit<ControllerRenderProps, 'onBlur' | 'ref'> {
  label?: string
  disabled?: boolean
  wrapperClassName?: string
  labelClassName?: string
  ref?: RefCallBack
  onBlur?: () => void
}

export const Switch: FC<SwitchProps> = ({ name, value, label, wrapperClassName, labelClassName, ...rest }) => {
  return (
    <HeadlessSwitch.Group
      data-testid='switch-wrapper'
      as='div'
      className={cn('flex items-center gap-2', wrapperClassName)}
    >
      {label && <HeadlessSwitch.Label className={cn('source-text', labelClassName)}>{label}</HeadlessSwitch.Label>}
      <HeadlessSwitch
        {...rest}
        id={name}
        name={name}
        checked={value}
        className='group relative inline-flex items-center w-10 h-small bg-lines rounded-xl disabled:bg-gray disabled:cursor-not-allowed'
      >
        {({ checked }) => (
          <span
            aria-hidden='true'
            className={cn('w-5 h-5 bg-primary rounded-full inline-block transition-all group-disabled:bg-lines', {
              'translate-x-5 bg-secondary': checked,
            })}
          />
        )}
      </HeadlessSwitch>
    </HeadlessSwitch.Group>
  )
}
