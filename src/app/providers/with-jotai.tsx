import { Attributes, FC, Factory, ReactElement } from 'react'
import { Provider } from 'jotai'

const withJotai =
  <R extends Attributes>(Component: FC): Factory<R> =>
  (props?: R): ReactElement<R> =>
    (
      <Provider>
        <Component {...props} />
      </Provider>
    )

export default withJotai
