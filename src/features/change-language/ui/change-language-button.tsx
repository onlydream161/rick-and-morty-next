import { FC } from 'react'
import { useTranslate } from '../model'

export const ChangeLanguageButton: FC = () => {
  const { Icon, toggleLanguage } = useTranslate()
  return (
    <button key='lang' onClick={toggleLanguage}>
      {Icon}
    </button>
  )
}
