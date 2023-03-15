import RCUpload, { UploadProps as RCUploadProps } from 'rc-upload'
import { cloneElement } from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import cn from 'classnames'
import { UploadHookProps, useUpload } from '@/shared/hooks'
import { RcFile } from 'rc-upload/lib/interface'
import { AxiosResponse } from 'axios'
import { FCWithChildren, FileModel } from '@/shared/@types'

export interface UploadProps extends Omit<RCUploadProps, 'customRequest'> {
  optimistic?: boolean
  rules?: RegisterOptions
  error?: boolean
  customRequest?: (file: RcFile) => Promise<AxiosResponse<FileModel>>
}

// Использовать только внутри компонента Form
export const Upload: FCWithChildren<UploadProps> = ({
  children,
  name = 'files',
  optimistic,
  rules,
  error,
  className = '',
  customRequest,
  ...rest
}) => {
  const { control, getValues } = useFormContext()
  const { upload } = useUpload({
    multiple: rest.multiple,
    optimistic,
    customRequest,
  } as UploadHookProps)

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <RCUpload
          disabled={rest.disabled}
          className={cn('inline-flex input-focus focus-visible:ring-main', {
            'focus-visible:ring-red': error,
            [className]: className,
          })}
          beforeUpload={(_, list) => {
            return !rest.max || list.length + (getValues(name) || []).length <= rest.max
          }}
          customRequest={upload}
          onSuccess={res => {
            if (rest.multiple) {
              const currentValue = getValues(name) || []
              const existItemIndex = currentValue.findIndex((file: RcFile) => file.uid === res.uid)
              if (~existItemIndex) {
                currentValue[existItemIndex] = res
              } else {
                currentValue.push(res)
              }
              field.onChange(currentValue)
              return
            }
            field.onChange(res)
          }}
          {...rest}
        >
          {children &&
            cloneElement(children, {
              ...children.props,
              value: field.value,
              disabled: rest.disabled,
            })}
        </RCUpload>
      )}
    />
  )
}
