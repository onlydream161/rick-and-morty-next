import Head from 'next/head'
import { API_MOCKING } from '@/shared/config'
import { AppPropsWithLayout } from '@/shared/@types'
import App from '@/app'
//Next.js требует импортировать глобальные стили только в _app.tsx
import '@/app/index.css'

if (API_MOCKING === 'enabled') {
  require('@/app/mocks-server')
}

const _App = (props: AppPropsWithLayout) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <App {...props} />
    </>
  )
}

// This disables the ability to perform automatic static optimization,
// causing every page in your app to be server-side rendered.
// Если не нужно подтягивать одинаковые данные для каждой страницы, то метод стоит убрать
// _App.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await NextApp.getInitialProps(appContext)
//   return {
//     ...appProps,
//   }
// }

export default _App
