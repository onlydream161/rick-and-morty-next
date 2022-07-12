import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import { OptionalLinkWrapper } from '@/shared/lib'
import cn from 'classnames'

export interface TabProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  href?: string
  active?: boolean
  border?: boolean
}

export const Tab: FC<TabProps> = ({ children, href, active, border = true, ...rest }) => {
  return (
    <OptionalLinkWrapper href={href}>
      <button
        className={cn(
          `relative flex items-center px-base text-subtext text-gray
      bg-background-secondary w-full h-10 input-focus focus-visible:ring-primary
      hover:bg-background-hover active:text-white disabled:hover:bg-background-secondary disabled:cursor-not-allowed`,
          {
            [`after:content-[""] after:absolute after:h-[1px] after:right-[15px]
      after:left-[15px] after:bottom-0 after:bg-lines`]: border,
            ['text-white']: active,
          }
        )}
        {...rest}
      >
        {children}
      </button>
    </OptionalLinkWrapper>
  )
}
