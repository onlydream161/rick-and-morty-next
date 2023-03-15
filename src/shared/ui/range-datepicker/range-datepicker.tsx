import { forwardRef } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { RangePicker } from 'rc-picker'
import generateConfig from 'rc-picker/lib/generate/dayjs'
import ruRu from 'rc-picker/lib/locale/ru_RU'
import enUS from 'rc-picker/lib/locale/en_US'
import { RangePickerSharedProps } from 'rc-picker/lib/RangePicker'
import Arrow from '@/shared/assets/icons/common/separator-arrow.svg'
import ClearSvg from '@/shared/assets/icons/common/close.svg'
import cn from 'classnames'
import { PropsWithClassName, TFunction } from '@/shared/@types'
import { RangeValue } from 'rc-picker/lib/interface'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export interface RangeDatepickerProps extends Omit<RangePickerSharedProps<Dayjs>, 'value'> {
  name: string
  locale?: 'ru' | 'en'
  value?: [string, string] | RangeValue<Dayjs>
  label?: string
  resetTime?: boolean
  error?: boolean
  errorMessage?: string
  rangePickerClassName?: string
  inputReadOnly?: boolean
  t: TFunction
}

// Если брать этот компонент для формы, то только через Controller
export const RangeDatepicker = forwardRef<RangePicker<Dayjs>, PropsWithClassName<RangeDatepickerProps>>(
  (
    {
      name,
      label,
      value,
      resetTime = true,
      error,
      errorMessage,
      className = '',
      rangePickerClassName = '',
      inputReadOnly = true,
      onChange,
      locale = 'ru',
      t,
      ...rest
    },
    ref
  ) => {
    Object.assign(ruRu, { shortWeekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] })
    Object.assign(ruRu, {
      shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    })

    return (
      <div className={cn('flex flex-col gap-[2px] w-fit', className)}>
        {label && <h6 className='text-background-primary ml-base'>{label}</h6>}
        <RangePicker
          inputReadOnly={inputReadOnly}
          id={name}
          name={name}
          ref={ref}
          generateConfig={generateConfig}
          locale={locale == 'ru' ? ruRu : enUS}
          separator={
            <Arrow
              className={cn('fill-background-primary', {
                '!fill-red': error,
              })}
            />
          }
          allowClear
          clearIcon={
            <ClearSvg className='w-4 h-4 transition-colors duration-100 cursor-pointer fill-background-primary hover:stroke-main' />
          }
          className={cn('', {
            'rc-picker-range-error': error,
            [rangePickerClassName]: rangePickerClassName,
          })}
          showTime={false}
          allowEmpty={[true, true]}
          placeholder={[t('notSelected'), t('notSelected')]}
          value={value?.map(el => (el ? dayjs(el) : null)) as RangeValue<Dayjs>}
          onChange={(dValue, sValue) => {
            onChange?.(
              resetTime
                ? [dValue?.[0]?.startOf('D') || null, dValue?.[1]?.endOf('D') || null]
                : (dValue?.map(value => value?.utc() || null) as RangeValue<Dayjs>),
              sValue.map(date =>
                // Fix for FireFox
                date ? dayjs(date.match(/(\d+)|(\w+)|(\d+)/g)?.join('/')).format('YYYY-MM-DD') : ''
              ) as [string, string]
            )
          }}
          {...rest}
        />
        {error && errorMessage && <h6 className='text-red ml-base'>{errorMessage}</h6>}
      </div>
    )
  }
)
