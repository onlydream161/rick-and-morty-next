import { FC, PropsWithChildren } from 'react'
import { LANG_RU, LANG_EN, THEME_DARK, THEME_LIGHT, SORT_ASC, SORT_DESC } from '@/shared/config'

export type FCWithChildren<T = unknown> = FC<PropsWithChildren<T>>

export type ThemeType = typeof THEME_LIGHT | typeof THEME_DARK

export type Nullable<T> = T | null

export type Sort = typeof SORT_ASC | typeof SORT_DESC

export type TFunction = (str: string) => string

export type Language = typeof LANG_RU | typeof LANG_EN

export type JWT_Token = string

export type Color =
  | 'default'
  | 'transparent'
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'lines'
  | 'backgroundPrimary'
  | 'backgroundSecondary'
  | 'backgroundHover'
  | 'red'
  | 'white'
  | 'buttonPressPrimary'
  | 'buttonPressSecondary'
  | 'orange'
  | 'green'
