import { Nullable } from '@/shared/@types'

export const getNumberFromString = (str: string) => +str.replace(/\D+/g, '')

export const getOnlyDigitsString = (str = '') => str.replace(/\D+/g, '')

export const getNormalizedSortString = (field: string, sort: Nullable<string>): string =>
  `{"order[${field}]":"${sort}"}`

export const getDefinitionFromArray = (number: number, titles: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]
}

export const getIdFromIRI = (iri?: Nullable<string>) => iri?.split('/').pop()

export const convertSnakeCaseToCamelCase = (str?: Nullable<string>) =>
  str?.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()) || ''

export const removeLastDot = (str: string) => {
  if (str.endsWith('.')) {
    return str.slice(0, -1)
  }
  return str
}
