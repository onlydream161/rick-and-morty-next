import { BaseEntity, TFunction } from '@/shared/@types'
import { MAXIMUM_BACKEND_NUMBER, MINIMUM_BACKEND_NUMBER } from '@/shared/config'
import * as yup from 'yup'

export enum FormMode {
  Read = 'read',
  Create = 'create',
  Update = 'update',
}

// parentName должен иметь в кноце . , так сделано,
// чтобы можно было использовать вложенные блоки формы без вложенности
export const getNestedFieldName = (parentName?: string, fieldName?: string) => `${parentName}${fieldName}`

export const getOptionalRequired = (schema: yup.Schema, t: TFunction, required?: boolean) =>
  required ? schema.required(t('common:Required_field')) : schema.notRequired()

export const getNestedArrayFieldName = (parentName: string, index: number, fieldName: string) =>
  `${parentName}${index}.${fieldName}`

export const validateSelect = (t: TFunction, required = true) => {
  return yup
    .mixed()
    .nullable()
    .when({
      is: (value: string | BaseEntity) => typeof value === 'string' || value === null,
      then: schema => getOptionalRequired(schema, t, required),
      otherwise: schema =>
        getOptionalRequired(
          schema.transform((option: BaseEntity) => option['@id']),
          t,
          required
        ),
    })
}

export const transformInputNumberValueToNumber = (t: TFunction, required?: boolean) =>
  getOptionalRequired(
    yup
      .mixed()
      .nullable()
      .transform(value => {
        return Number.isNaN(value) || value === null ? null : +value
      })
      .when({
        is: (value: unknown) => typeof value === 'number',
        then: () =>
          yup
            .number()
            .min(MINIMUM_BACKEND_NUMBER, t('common:The_number_cannot_be_less_than'))
            .max(MAXIMUM_BACKEND_NUMBER, t('common:The_number_cannot_be_greater_than')),
      }),
    t,
    required
  )

export const transformInputMinutesValueToSeconds = (t: TFunction, required?: boolean) =>
  getOptionalRequired(
    yup.mixed().transform(value => {
      const time = value?.toString().split(' ')
      const minutes = time?.[0]
      const seconds = time?.[2]
      if (minutes === '00' && seconds) return +seconds
      return minutes && seconds ? +minutes * 60 + +seconds : +minutes * 60
    }),
    t,
    required
  )
