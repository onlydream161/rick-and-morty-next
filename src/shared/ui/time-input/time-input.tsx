import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { Input } from '@/shared/ui'
import { useTranslate } from '@/shared/lib'
import cn from 'classnames'

export interface TimeInputProps {
  isReadMode?: boolean
  minutesFieldName: string
  secondsFieldName: string
  label: string
  fullWidth?: boolean
  isLoading?: boolean
}

export const TimeInput: FC<TimeInputProps> = ({
  isReadMode,
  minutesFieldName,
  secondsFieldName,
  label,
  fullWidth = false,
  isLoading,
}) => {
  const { t } = useTranslate(['common'])
  const { control } = useFormContext()
  return (
    <div className='flex flex-col'>
      <h4 className='text-text-secondary'>{label}</h4>
      <div className='flex items-center gap-x-2.5'>
        <Controller
          control={control}
          render={({ field, fieldState: { error } }) => (
            <NumericFormat
              {...field}
              className={cn({
                'max-w-[160px]': !fullWidth,
                'max-w-fit': isReadMode,
              })}
              customInput={Input}
              decimalScale={0}
              isFilter
              isSaved={isReadMode}
              isLoading={isLoading}
              error={error}
            />
          )}
          name={minutesFieldName}
        />
        <h4 className='text-text-secondary'>{t('min')}.</h4>
        <Controller
          control={control}
          render={({ field, fieldState: { error } }) => (
            <NumericFormat
              {...field}
              className={cn({
                'max-w-[160px]': !fullWidth,
                'max-w-fit': isReadMode,
              })}
              customInput={Input}
              decimalScale={0}
              isSaved={isReadMode}
              isFilter
              isLoading={isLoading}
              error={error}
            />
          )}
          name={secondsFieldName}
        />
        <h4 className='text-text-secondary'>{t('sec')}.</h4>
      </div>
    </div>
  )
}
