import { FC } from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import { ControllerRenderProps } from 'react-hook-form'
import cn from 'classnames'

export interface SwitchProps extends ControllerRenderProps {
  label?: string
  disabled?: boolean
  wrapperClassName?: string
  labelClassName?: string
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
        className='relative inline-flex items-center w-10 group h-small bg-border rounded-xl disabled:bg-background-primary disabled:cursor-not-allowed'
      >
        {({ checked }) => (
          <span
            aria-hidden='true'
            className={cn('w-5 h-5 bg-main rounded-full inline-block transition-all group-disabled:bg-border', {
              'translate-x-5 bg-secondary': checked,
            })}
          />
        )}
      </HeadlessSwitch>
    </HeadlessSwitch.Group>
  )
}
