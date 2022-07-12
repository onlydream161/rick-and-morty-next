import { useAtom } from 'jotai'
import React, { FC } from 'react'
import { AppProps } from 'next/app'
import { Hydrate, QueryClientProvider } from 'react-query'
import { queryClientAtom } from '@/shared/lib'

const withReactQuery = (Component: FC<AppProps>) => (props: AppProps) => {
  const [queryClient] = useAtom(queryClientAtom)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={props.pageProps.dehydratedState}>
        <Component {...props} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default withReactQuery
