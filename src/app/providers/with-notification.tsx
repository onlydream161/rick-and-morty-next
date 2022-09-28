import { FC } from 'react'
import { ToastContainer } from 'react-toastify'

const withNotification =
  <R,>(Component: FC<R>): FC<R> =>
  (props: R) => {
    return (
      <>
        <Component {...props} />
        <ToastContainer position='bottom-right' hideProgressBar={true} closeButton={false} />
      </>
    )
  }

export default withNotification
