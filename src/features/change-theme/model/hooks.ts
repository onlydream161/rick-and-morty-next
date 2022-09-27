import { useEffect } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { THEME_DARK, THEME_LIGHT } from '@/shared/config'
import { themeAtom } from './theme'

export const useInitTheme = () => {
  const theme = useAtomValue(themeAtom)

  useEffect(() => {
    const body = document.querySelector('html')
    if (theme === THEME_DARK) {
      body?.classList.add('dark')
    } else {
      body?.classList.remove('dark')
    }
  }, [theme])
}

export const useThemeSwitcher = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  return {
    theme,
    setDarkTheme: () => setTheme(THEME_DARK),
    setLightTheme: () => setTheme(THEME_LIGHT),
    onToggle: () => setTheme(theme => (theme === THEME_DARK ? THEME_LIGHT : THEME_DARK)),
  }
}
