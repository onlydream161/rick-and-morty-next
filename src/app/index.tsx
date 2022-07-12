import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
import NProgress from 'nprogress'
import { setCookie } from 'nookies'
import { ToastContainer } from 'react-toastify'
import { i18n } from 'next-i18next'
import { withProviders } from './providers'
import { useAfterMountEffect } from '@/shared/hooks'

NProgress.configure({ showSpinner: false })
dayjs.locale(ru)

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  useEffect(() => {
    const startLoading = NProgress.start
    const doneLoading = NProgress.done
    //TODO: Вернуть
    //Чистка пустых хэшей в урле
    // window.addEventListener('hashchange', () =>
    //   history.pushState(
    //     '',
    //     document.title,
    //     window.location.pathname + window.location.hash.replace(/&?\w+=%22%22&?/gm, '')
    //   )
    // )
    router.events.on('routeChangeStart', startLoading)
    router.events.on('routeChangeComplete', doneLoading)
    router.events.on('routeChangeError', doneLoading)
    return () => {
      router.events.off('routeChangeStart', startLoading)
      router.events.off('routeChangeComplete', doneLoading)
      router.events.off('routeChangeError', doneLoading)
    }
  }, [])

  useAfterMountEffect(() => {
    i18n?.language && setCookie(null, 'NEXT_LOCALE', i18n.language, { path: '/' })
  }, [i18n])

  return (
    <>
      <div className='flex flex-col justify-between h-full min-h-screen'>
        <main className='flex flex-col overflow-x-hidden min-w-base'>
          <Component {...pageProps} />
        </main>
      </div>
      <ToastContainer position='bottom-right' hideProgressBar={true} closeButton={false} />
    </>
  )
}

export default withProviders(App)
