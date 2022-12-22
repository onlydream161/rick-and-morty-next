import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { LANG_RU, LANG_EN, THEME_DARK, THEME_LIGHT, SORT_ASC, SORT_DESC } from '@/shared/config'
import { FCWithChildren } from './utils'
import { RESET } from 'jotai/utils'
import { SetStateAction } from 'jotai'

export type NextPageWithLayout = NextPage & {
  Layout?: FCWithChildren
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type ThemeType = typeof THEME_LIGHT | typeof THEME_DARK

export type Sort = typeof SORT_ASC | typeof SORT_DESC

export type SortAtom = [Sort, (update: typeof RESET | SetStateAction<Sort>) => void]

export type TFunction = (str: string) => string

export type Language = typeof LANG_RU | typeof LANG_EN

export interface BaseEntity {
  id: number
  dateCreate: string
  dateUpdate: string
}

export interface CollectionResponse<T> {
  countOfPages: number
  items: T[]
  itemsPerPage: number
  totalItems: number
}

export interface FileModel extends BaseEntity {
  name: string
  path: string
  isFullPath: boolean
  loading?: boolean
}

export interface SelectOption {
  id: number | string
  label: string
  disabled?: boolean
}
