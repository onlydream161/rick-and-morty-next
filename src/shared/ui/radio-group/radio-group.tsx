import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react'
import { PropsWithClassName, SelectOption } from '@/shared/@types'
import cn from 'classnames'

export interface RadioGroupProps<T extends number | string> {
  value: T
  options?: SelectOption[]
  optionClassName?: string
  onChange: (value: T) => void
}

export const RadioGroup = <T extends number | string>({
  value,
  options,
  className,
  optionClassName,
  onChange,
}: PropsWithClassName<RadioGroupProps<T>>) => {
  return (
    <HeadlessRadioGroup className={cn('w-fit', className)} value={value} onChange={onChange}>
      {options?.map(option => (
        <HeadlessRadioGroup.Option key={`${option.id}`} value={option.id} disabled={option.disabled}>
          {({ checked, disabled }) => (
            <div
              className={cn(
                'flex items-center gap-small cursor-pointer transition-colors',
                {
                  'text-background-primary hover:text-main': !checked && !disabled,
                  'text-main': checked && !disabled,
                  'text-background-primary !cursor-not-allowed': disabled,
                },
                optionClassName
              )}
            >
              <div className='flex items-center justify-center w-5 h-5 border-[1.5px] border-currentColor rounded-full'>
                <div
                  className={cn('w-2 h-2 rounded-full bg-currentColor opacity-0 transition-opacity', {
                    'opacity-100': checked,
                  })}
                />
              </div>
              <h4
                className={cn({
                  'font-semibold': checked,
                  'text-black': !disabled,
                  'text-background-primary': disabled,
                })}
              >
                {option.label}
              </h4>
            </div>
          )}
        </HeadlessRadioGroup.Option>
      ))}
    </HeadlessRadioGroup>
  )
}
