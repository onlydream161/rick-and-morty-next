import { FC } from 'react'
import { NumericFormat } from 'react-number-format'
import { Input, InputProps } from '@/shared/ui'

export interface NumericInputProps extends Omit<InputProps, 'value' | 'type'> {
  decimalScale?: number
  thousandSeparator?: string
  value: string | number | null
}

export const NumericInput: FC<NumericInputProps> = ({ name, label, ...rest }) => {
  return (
    <NumericFormat
      {...rest}
      id={name}
      name={name}
      customInput={Input}
      value={rest.value === null ? '' : rest.value}
      label={label}
    />
  )
}
