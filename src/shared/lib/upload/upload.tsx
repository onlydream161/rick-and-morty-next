import RCUpload, { UploadProps as RCUploadProps } from 'rc-upload'
import { cloneElement, ReactElement } from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import { UploadHookProps, useUpload } from '@/shared/hooks'
import { RcFile } from 'rc-upload/lib/interface'
import { AxiosResponse } from 'axios'
import { FCWithClassName, FileModel } from '@/shared/@types'
import cn from 'classnames'
import { notify } from '../notification'
import { useTranslate } from '../change-language'
import { extension } from 'mime-types'

export interface UploadProps extends Omit<RCUploadProps, 'customRequest' | 'onSuccess'> {
  optimistic?: boolean
  withOffline?: boolean
  rules?: RegisterOptions
  error?: boolean
  children?: ReactElement
  onSuccess?: (file: FileModel) => void
  customRequest?: (file: RcFile) => Promise<AxiosResponse<FileModel>>
}

// Использовать только внутри компонента Form
export const Upload: FCWithClassName<UploadProps> = ({
  children,
  name = 'files',
  optimistic,
  withOffline,
  rules,
  max,
  error,
  className = '',
  onSuccess,
  customRequest,
  ...rest
}) => {
  const { t } = useTranslate(['common'])
  const { control, getValues, setValue } = useFormContext()
  const { upload } = useUpload({
    multiple: rest.multiple,
    optimistic,
    withOffline,
    customRequest,
  } as UploadHookProps)

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <RCUpload
          max={max}
          disabled={rest.disabled}
          className={cn('inline-flex input-focus focus-visible:ring-primary', {
            'focus-visible:ring-red': error,
            [className]: className,
          })}
          beforeUpload={(file, list) => {
            const hasMaxNotReached = !max || list.length + (getValues(name) || []).length <= max
            const fileExtension = extension(file.type)
            const hasAcceptedExtension = !rest.accept || !fileExtension || rest.accept.includes(fileExtension)
            const hasMaxSizeNotReached = file.size / 1048576 < 100
            if (!hasMaxNotReached) {
              notify(t('Maximum number of files exceeded'), { status: 'error' })
            }
            if (!hasAcceptedExtension) {
              notify(t('Unsupported file format'), { status: 'error' })
            }
            if (!hasMaxSizeNotReached) {
              notify(t('The maximum file size is 100 megabytes'), { status: 'error' })
            }
            return hasMaxNotReached && hasAcceptedExtension && hasMaxSizeNotReached
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
            } else {
              field.onChange(res)
            }

            if (res?.['@id']) {
              // RcUpload не дает возмоажности перебить типы onSuccess
              onSuccess?.(res as unknown as FileModel)
            }
          }}
          onError={(_, __, rcFile) =>
            setValue(
              name,
              (getValues(name) as (FileModel & { uid: string })[])?.filter(file => file.uid !== rcFile.uid) || []
            )
          }
          {...rest}
        >
          {children &&
            (!max || (getValues(name)?.length || 0) < max) &&
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
