import { useAtom } from 'jotai'
import { Attributes, FC, Factory, ReactElement } from 'react'
import { DehydratedState, Hydrate, QueryClientProvider } from 'react-query'
import { queryClientAtom } from '@/shared/lib'

const withReactQuery =
  <R extends Attributes>(Component: FC): Factory<R> =>
  (props?: R & { pageProps?: { dehydratedState?: DehydratedState } }): ReactElement<R> => {
    const [queryClient] = useAtom(queryClientAtom)

    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={props?.pageProps?.dehydratedState || {}}>
          <Component {...props} />
        </Hydrate>
      </QueryClientProvider>
    )
  }

export default withReactQuery
