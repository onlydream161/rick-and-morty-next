import { Attributes, FC, Factory, ReactElement } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

const withSkeleton =
  <R extends Attributes>(Component: FC): Factory<R> =>
  (props?: R): ReactElement<R> =>
    (
      <SkeletonTheme
        inline
        borderRadius={10}
        baseColor='rgb(var(--skeleton))'
        highlightColor='rgb(var(--skeleton-highlight))'
      >
        <Component {...props} />
      </SkeletonTheme>
    )

export default withSkeleton
