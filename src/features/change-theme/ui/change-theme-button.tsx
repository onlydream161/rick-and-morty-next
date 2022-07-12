import { FC } from 'react'
import Moon from '@/shared/assets/icons/common/moon.svg'
import Sun from '@/shared/assets/icons/common/sun.svg'
import { useThemeSwitcher } from '@/features/change-theme'
import { THEME_DARK } from '@/shared/config'

export const ChangeThemeButton: FC = () => {
  const { theme, onToggle } = useThemeSwitcher()

  const Icon = theme === THEME_DARK ? Moon : Sun

  return (
    <button key='theme' onClick={onToggle}>
      <Icon className='fill-primary w-[22px] h-[22px]' />
    </button>
  )
}
