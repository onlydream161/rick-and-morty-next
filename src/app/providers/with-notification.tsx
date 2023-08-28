import { Attributes, FC, Factory, ReactElement } from 'react'
import { ToastContainer } from 'react-toastify'

const withNotification =
  <R extends Attributes>(Component: FC): Factory<R> =>
  (props?: R): ReactElement<R> =>
    (
      <>
        <Component {...props} />
        <ToastContainer position='bottom-right' hideProgressBar={true} closeButton={false} />
      </>
    )

export default withNotification
