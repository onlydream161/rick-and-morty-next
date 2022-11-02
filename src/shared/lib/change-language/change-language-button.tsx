import { FC } from 'react'
import { useTranslate } from './hooks'

export const ChangeLanguageButton: FC = () => {
  const { Icon, toggleLanguage } = useTranslate()

  return (
    <button key='lang' onClick={toggleLanguage}>
      <Icon className='fill-primary w-[22px] h-[22px]' />
    </button>
  )
}
