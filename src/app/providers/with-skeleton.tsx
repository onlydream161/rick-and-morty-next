import { FC } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

const withSkeleton =
  <R,>(Component: FC<R>): FC<R> =>
  (props: R) => {
    return (
      <SkeletonTheme
        inline
        borderRadius={10}
        baseColor='rgb(var(--skeleton))'
        highlightColor='rgb(var(--skeleton-highlight))'
      >
        <Component {...props} />
      </SkeletonTheme>
    )
  }

export default withSkeleton
