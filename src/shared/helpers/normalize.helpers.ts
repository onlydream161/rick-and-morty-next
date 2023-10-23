import { get } from 'lodash'
import { SelectOption, TFunction } from '../@types'

export const getSelectAllOption = (t: TFunction) => [{ id: '', label: t('all') }]

export const getBinaryOptions = (truthyLabel: string, falsyLabel: string) => [
  { label: truthyLabel, id: true },
  { label: falsyLabel, id: false },
]

export const sortArraOfObjectsByAlphabetically = <T extends Record<string, unknown>>(array: T[], sortField: keyof T) =>
  array.sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return -1
    }
    if (a[sortField] > b[sortField]) {
      return 1
    }
    return 0
  })

export const normalizeSelectOptions = <T extends {}[]>(
  data?: T,
  options?: {
    labelKey?: string | ((entity: T[number]) => string)
    valueKey?: string
    defaultValue?: SelectOption[]
    validate?: (item: T[number]) => boolean
  },
  additionalFields?: string[]
): SelectOption[] => {
  const { defaultValue, labelKey, valueKey, validate } = {
    defaultValue: [],
    labelKey: 'name',
    valueKey: '@id',
    ...options,
  }
  const getCustomFiled = (el: {}) => {
    return additionalFields?.reduce((acc, field) => {
      acc[field] = get(el, field)
      return acc
    }, {} as Record<string, unknown>)
  }

  return [
    ...defaultValue,
    ...(data
      ? data.reduce<SelectOption[]>((acc, el) => {
          if (!validate || validate(el)) {
            acc.push({
              label: typeof labelKey === 'function' ? labelKey(el) : (get(el, labelKey, '') as string),
              id: get(el, valueKey) as string,
              ...(additionalFields?.length && {
                ...getCustomFiled(el),
              }),
            })
          }
          return acc
        }, [])
      : []),
  ]
}

export const normalizeSelectOptionsFromEnum = <T extends Record<string, string>>(
  data: T,
  t: TFunction,
  translatePrefix = '',
  postfix?: string | ((value: string) => string)
): SelectOption[] =>
  Object.values(data).map(entity => ({
    id: entity,
    label: t(translatePrefix + entity) + ((typeof postfix === 'function' ? postfix?.(entity) : postfix) || ''),
  }))

export const normalizeSelectOptionsFromConstantsKeysArray = (
  constants: string[],
  t: TFunction
): SelectOption<number>[] => constants.map((constant, index) => ({ id: index, label: t(constant) }))

export const normalizeArrayToSeparatedString = (data: unknown[], separator: string): string =>
  data.filter(entity => entity).join(separator)
