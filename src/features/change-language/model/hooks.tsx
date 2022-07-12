import { useMemo } from 'react'
import { Language } from '@/shared/@types'
import { LANG_EN, LANG_RU } from '@/shared/config'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import En from '@/shared/assets/icons/common/en.svg'
import Ru from '@/shared/assets/icons/common/ru.svg'

export const useTranslate = (namespace?: string[]) => {
  const router = useRouter()
  const translation = useTranslation(namespace)

  const lang = translation.i18n.language

  const Icon = useMemo(() => (lang === LANG_RU ? En : Ru), [lang])

  const _changeLocale = (locale: string) =>
    router.push({ pathname: router.pathname, query: router.query }, router.asPath, { locale })

  const changeLanguage = (lang: Language) => _changeLocale(lang).then(() => translation.i18n.changeLanguage(lang))

  const toggleLanguage = () => {
    const newLang = lang === LANG_RU ? LANG_EN : LANG_RU
    _changeLocale(newLang).then(() => translation.i18n.changeLanguage(newLang))
  }

  return {
    ...translation,
    Icon: <Icon className='fill-primary w-[22px] h-[22px]' />,
    changeLanguage,
    toggleLanguage,
  }
}
