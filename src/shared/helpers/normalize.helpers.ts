import { get } from 'lodash'
import { SelectOption, TFunction } from '../@types'

export const getSelectAllOption = (t: TFunction) => [{ id: '', label: t('all') }]

export const getBinaryOptions = (truthyLabel: string, falsyLabel: string) => [
  { label: truthyLabel, id: true },
  { label: falsyLabel, id: false },
]

export const normalizeSelectOptions = <T extends {}[]>(
  data?: T,
  options?: {
    labelKey?: string
    valueKey?: string
    defaultValue?: SelectOption[]
  }
): SelectOption[] => {
  const defaultOptions = {
    defaultValue: [],
    labelKey: 'name',
    valueKey: 'id',
    ...options,
  }

  return [
    ...defaultOptions.defaultValue,
    ...(data
      ? data.map(el => ({
          label: get(el, defaultOptions.labelKey, '') as string,
          id: get(el, defaultOptions.valueKey) as number,
        }))
      : []),
  ]
}

export const normalizeSelectOptionsFromEnum = <T extends Record<string, string>>(
  data: T,
  t: TFunction
): SelectOption[] => Object.values(data).map(entity => ({ id: entity, label: t(entity) }))

export const normalizeSelectOptionsFromConstantsKeysArray = (constants: string[], t: TFunction): SelectOption[] =>
  constants.map((constant, index) => ({ id: index, label: t(constant) }))

export const normalizeArrayToSeparatedString = (data: unknown[], separator: string): string =>
  data.filter(entity => entity).join(separator)
