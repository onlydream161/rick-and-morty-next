import { useAtom } from 'jotai'
import { themeAtom } from '@/features/change-theme'
import { THEME_DARK, THEME_LIGHT } from '@/shared/config'

export const useThemeSwitcher = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  const onToggle = () => {
    document.querySelector('body')?.classList.toggle(THEME_DARK)
    setTheme(theme => (theme === THEME_DARK ? THEME_LIGHT : THEME_DARK))
  }

  return {
    theme,
    onToggle,
  }
}
