import { FC, PropsWithChildren } from 'react'
import Link from 'next/link'

export interface OptionalLinkWrapperProps {
  href?: string
  newTab?: boolean
}

export const OptionalLinkWrapper: FC<PropsWithChildren<OptionalLinkWrapperProps>> = ({ children, href, newTab }) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <a {...(newTab && { target: '_blank', rel: 'noreferrer noopener' })}>{children}</a>
        </Link>
      ) : (
        children
      )}
    </>
  )
}
