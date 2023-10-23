import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { LANG_RU, LANG_EN, THEME_DARK, THEME_LIGHT, SORT_ASC, SORT_DESC } from '@/shared/config'
import { FCWithChildren, Nullable } from './utils'
import { RESET } from 'jotai/utils'
import { SetStateAction } from 'jotai'
import { ComponentType } from 'react'
import { Primitive } from 'react-hook-form'

export type NextPageWithLayout = NextPage & {
  Layout?: FCWithChildren | ComponentType
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type ThemeType = typeof THEME_LIGHT | typeof THEME_DARK

export type Sort = typeof SORT_ASC | typeof SORT_DESC

export type SortAtom = [Sort, (update: typeof RESET | SetStateAction<Sort>) => void]

export type TFunction = (str: string) => string

export type Language = typeof LANG_RU | typeof LANG_EN

export type SentryLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug'

export type SentryBreadcrumb = {
  type?: string
  category?: string
  message?: string
  level?: SentryLevel
  timestamp?: number
}

export type SentryContext = {
  title: string
  data?: Nullable<Record<string, unknown>>
}

export type SentryTag = {
  title: string
  data?: Primitive
}

export type SentryAttachment = {
  title: string
  data: Uint8Array
}

export enum TranslateType {
  Single = 'single',
  Multiple = 'multiple',
}

export interface BaseEntity {
  '@context': string
  '@id': string
  '@type': string
  id: string
  dateCreate: string
  dateUpdate: string
}
export type GetFormValue = (name: string) => unknown
export interface CollectionResponse<T = {}> {
  '@context': string
  '@id': string
  '@type': string
  'hydra:member': T[]
  'hydra:totalItems': number
  'hydra:view': {
    '@id': string
    '@type': string
    'hydra:first': string
    'hydra:last': string
    'hydra:next': string
  }
}

export interface HydraError {
  '@context': string
  '@type': string
  'hydra:description': string
  'hydra:title': string
}

export interface FileModel extends BaseEntity {
  fullPath: string
  mimeType: string
  originalName: string
  path: string
  base64?: string
  loading?: boolean
}

export interface FileModelWithPrivate extends FileModel {
  documentId: string
  originalName: string
  path: string
  loading?: boolean
  isHidden?: boolean
  author: string
}

export interface SelectOption<T extends number | string | boolean = string> {
  id: T
  label: string
  disabled?: boolean
  [key: string]: unknown
}

export type CustomSelectOption = {
  id?: string
  [key: string]: string | number | CustomSelectOption | undefined
}

export type BaseFilter = {
  id: string
  label: string
}
export type OrderBaseFilter = Nullable<string | string[] | number | BaseFilter | BaseFilter[]>
