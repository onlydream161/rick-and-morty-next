import { FC } from 'react'
import { Provider } from 'jotai'

const withJotai =
  <R,>(Component: FC<R>): FC<R> =>
  (props: R) => {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    )
  }

export default withJotai
