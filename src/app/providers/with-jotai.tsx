import { FC } from 'react'
import { Provider } from 'jotai'
import { AppProps } from 'next/app'

const withJotai = (Component: FC<AppProps>) => (props: AppProps) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
}

export default withJotai
