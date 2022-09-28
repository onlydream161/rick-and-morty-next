import { FC, useEffect, useState } from 'react'
import Moon from '@/shared/assets/icons/common/moon.svg'
import Sun from '@/shared/assets/icons/common/sun.svg'
import { THEME_DARK } from '@/shared/config'
import { useThemeSwitcher } from '../model'

export const ChangeThemeButton: FC = () => {
  const { theme, onToggle } = useThemeSwitcher()
  const [Icon, setIcon] = useState(() => Moon)

  useEffect(() => {
    setIcon(() => (theme === THEME_DARK ? Moon : Sun))
  }, [theme])

  return (
    <button key='theme' onClick={onToggle}>
      <Icon className='w-[22px] h-[22px] icon-base' />
    </button>
  )
}
