import dayjs, { Dayjs } from 'dayjs'
import { Nullable, SelectOption } from '@/shared/@types'
import { getObjectWithoutEmptyProperty } from './object.helpers'

export const getSelectOptionsFromListOfConstants = (list: string[]): SelectOption[] =>
  list.map(el => ({ id: el, label: el }))

export const getDateRangeFilters = (data: Record<string, Nullable<Dayjs>>) => {
  const object = getObjectWithoutEmptyProperty(data)
  return Object.keys(object).reduce((arr, key) => ({ ...arr, [key]: dayjs(object[key]).format() }), {})
}

export const getBetweenFilterValue = (value: Nullable<number[]>) => value && value.join('..')
