import Head from 'next/head'
import NextApp, { AppContext, AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { API_MOCKING } from '@/shared/config'
import App from '@/app'
//Next.js требует импортировать глобальные стили только в _app.tsx
import '@/app/index.css'

const _App = (props: AppProps) => {
  const [isMocksServerReady, setIsMocksServerReady] = useState(typeof window === 'undefined')

  useEffect(() => {
    if (API_MOCKING === 'enabled') {
      setIsMocksServerReady(false)
      import('@/app/mocks-server').then(mod => mod.default()).finally(() => setIsMocksServerReady(true))
    }
  }, [])

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      {isMocksServerReady && <App {...props} />}
    </>
  )
}

// This disables the ability to perform automatic static optimization,
// causing every page in your app to be server-side rendered.
// Если не нужно подтягивать одинаковые данные для каждой страницы, то метод стоит убрать
_App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext)
  return {
    ...appProps,
  }
}

export default _App
