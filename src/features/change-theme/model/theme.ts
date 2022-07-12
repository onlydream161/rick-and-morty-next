import { ThemeType } from '@/shared/@types'
import { THEME_DARK } from '@/shared/config'
import { atomWithStorage } from 'jotai/utils'

export const themeAtom = atomWithStorage<ThemeType>('theme', THEME_DARK)
