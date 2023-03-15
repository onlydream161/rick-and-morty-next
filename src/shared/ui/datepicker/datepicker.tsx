import { PickerPanel } from 'rc-picker'
import { Popover, Transition } from '@headlessui/react'
import { FCWithClassName, Nullable } from '@/shared/@types'
import { DEFAULT_DATE_FORMAT, SHORT_MONTHS_NAME, SHORT_WEEK_DAYS_NAME } from '@/shared/config'
import { Input, InputProps } from '../input'
import { Button } from '../button'
import { PickerPanelDateProps } from 'rc-picker/lib/PickerPanel'
import dayjs, { Dayjs } from 'dayjs'
import ArrowIcon from '@/shared/assets/icons/common/select-arrow.svg'
import generateConfig from 'rc-picker/lib/generate/dayjs'
import ruRu from 'rc-picker/lib/locale/ru_RU'
import cn from 'classnames'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export interface DatepickerProps
  extends Omit<PickerPanelDateProps<Dayjs>, 'value' | 'onChange' | 'locale' | 'generateConfig'> {
  name: string
  label?: string
  value?: Nullable<string>
  disabled?: boolean
  isSaved?: boolean
  inputProps?: Omit<InputProps, 'name'>
  rangePickerClassName?: string
  onChange?: (value: Nullable<string>) => void
}

// Если брать этот компонент для формы, то только через Controller
export const Datepicker: FCWithClassName<DatepickerProps> = ({
  name,
  label,
  value,
  className,
  disabled,
  isSaved,
  inputProps,
  rangePickerClassName,
  onChange,
  ...rest
}) => {
  Object.assign(ruRu, { shortWeekDays: SHORT_WEEK_DAYS_NAME })
  Object.assign(ruRu, { shortMonths: SHORT_MONTHS_NAME })

  const inputValue = value ? dayjs(value).utc(true).format(DEFAULT_DATE_FORMAT) : ''
  const datepickerValue = value ? dayjs(value).utc(true) : null

  return (
    <Popover className={cn('relative w-full z-20', className)}>
      {({ open, close }) => (
        <>
          <Popover.Button
            disabled={disabled || isSaved}
            className={cn('w-full text-left outline-none', {
              'cursor-text': isSaved,
            })}
          >
            <Input
              {...inputProps}
              name={name}
              value={inputValue}
              type='datepicker'
              readOnly
              isSaved={isSaved}
              isDropdownOpen={open}
              className={cn({ 'bg-background': open && value }, inputProps?.className)}
              disabled={disabled}
              reset={() => onChange?.(null)}
            />
          </Popover.Button>

          <Transition
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
            className='absolute top-[84px] right-0 origin-top-left'
          >
            <Popover.Panel>
              <PickerPanel
                {...rest}
                locale={ruRu}
                // В либе не правильно описаны пропсы
                // @ts-expect-error
                prevIcon={
                  <Button variant='icon' color='secondary'>
                    <ArrowIcon className='rotate-90 stroke-currentColor' />
                  </Button>
                }
                nextIcon={
                  <Button variant='icon' color='secondary'>
                    <ArrowIcon className='-rotate-90 stroke-currentColor' />
                  </Button>
                }
                superPrevIcon={
                  <Button variant='icon' color='secondary' childrenClassName='flex items-center'>
                    <ArrowIcon className='-mr-3 rotate-90 stroke-currentColor' />
                    <ArrowIcon className='rotate-90 stroke-currentColor' />
                  </Button>
                }
                superNextIcon={
                  <Button variant='icon' color='secondary' childrenClassName='flex items-center'>
                    <ArrowIcon className='-rotate-90 stroke-currentColor' />
                    <ArrowIcon className='-ml-3 -rotate-90 stroke-currentColor' />
                  </Button>
                }
                className={rangePickerClassName}
                showTime={false}
                value={datepickerValue}
                onChange={value => {
                  onChange?.(value.startOf('D').utc(true).format())
                  close()
                }}
                generateConfig={generateConfig}
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
