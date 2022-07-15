import RCUpload, { UploadProps as RCUploadProps } from 'rc-upload'
import { Children, cloneElement, ReactElement } from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import cn from 'classnames'
import { UploadHookProps, useUpload } from '@/shared/hooks'
import { RcFile } from 'rc-upload/lib/interface'
import { AxiosResponse } from 'axios'
import { FCWithChildren } from '@/shared/@types'

export interface UploadProps extends Omit<RCUploadProps, 'customRequest'> {
  optimistic?: boolean
  rules?: RegisterOptions
  error?: boolean
  customRequest?: (file: RcFile) => Promise<AxiosResponse<RcFile>>
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
  const { control } = useFormContext()
  const { isLoading, upload } = useUpload({
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
          className={cn('inline-flex input-focus focus-visible:ring-primary', {
            'focus-visible:ring-red': error,
            [className]: className,
          })}
          customRequest={upload}
          onSuccess={res => {
            if (rest.multiple) {
              const currentValue = field.value || []
              const existItemIndex = currentValue.findIndex((file: RcFile) => file.uid === res.uid)
              if (~existItemIndex) {
                currentValue[existItemIndex] = res
                field.onChange(currentValue)
                return
              }
              currentValue.push(res)
              field.onChange(currentValue)
              return
            }
            field.onChange(res)
          }}
          {...rest}
        >
          {Array.isArray(children) &&
            Children.map(children, (child: ReactElement) => {
              return cloneElement(child, {
                ...child.props,
                value: field.value,
                isLoading: isLoading,
              })
            })}
        </RCUpload>
      )}
    />
  )
}
