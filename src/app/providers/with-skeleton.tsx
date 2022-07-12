import { FC } from 'react'
import { AppProps } from 'next/app'
import { SkeletonTheme } from 'react-loading-skeleton'

const withSkeleton = (Component: FC<AppProps>) => (props: AppProps) => {
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
