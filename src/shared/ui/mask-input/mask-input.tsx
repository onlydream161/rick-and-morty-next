import { FC } from 'react'
import { PatternFormat } from 'react-number-format'
import { Input, InputProps } from '@/shared/ui'

export interface MaskInputProps extends Omit<InputProps, 'value'> {
  format: string
  value: string
}

export const MaskInput: FC<MaskInputProps> = ({ name, label, format, ...rest }) => {
  return (
    <PatternFormat
      {...rest}
      id={name}
      name={name}
      customInput={Input}
      value={rest.value}
      format={format}
      placeholder={rest.placeholder}
      label={label}
      type='text'
    />
  )
}
