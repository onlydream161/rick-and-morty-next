import { useAtom, useAtomValue } from 'jotai'
import { themeAtom } from '@/features/change-theme'
import { useEffect } from 'react'
import { THEME_DARK, THEME_LIGHT } from '@/shared/config'

export const useTheme = () => {
  const theme = useAtomValue(themeAtom)

  useEffect(() => {
    const body = document.querySelector('body')
    if (theme === THEME_DARK) {
      body?.classList.add(theme)
    } else {
      body?.classList.remove(THEME_DARK)
    }
  }, [theme])
}

export const useThemeSwitcher = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  return {
    theme,
    onToggle: () => setTheme(theme => (theme === THEME_DARK ? THEME_LIGHT : THEME_DARK)),
  }
}
