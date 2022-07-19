import { useAtom } from 'jotai'
import React, { FC } from 'react'
import { Hydrate, QueryClientProvider } from 'react-query'
import { queryClientAtom } from '@/shared/lib'

const withReactQuery =
  <R,>(Component: FC<R>): FC<R> =>
  (props: R & { pageProps?: { dehydratedState: {} } }) => {
    const [queryClient] = useAtom(queryClientAtom)

    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={props.pageProps?.dehydratedState || {}}>
          <Component {...props} />
        </Hydrate>
      </QueryClientProvider>
    )
  }

export default withReactQuery
