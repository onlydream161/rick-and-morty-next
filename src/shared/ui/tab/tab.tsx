import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import { OptionalLinkWrapper } from '@/shared/lib'
import ErrorIcon from '@/shared/assets/icons/common/tab-error.svg'
import CloseIcon from '@/shared/assets/icons/common/close.svg'
import cn from 'classnames'
import { Button } from '@/shared/ui'

export type VariantTabs = 'primary' | 'transparent'

export interface TabProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: VariantTabs
  href?: string
  active?: boolean
  error?: boolean
  onRemove?: () => void
}

export const Tab: FC<TabProps> = ({
  children,
  href,
  variant = 'primary',
  error,
  className,
  active,
  onRemove,
  ...rest
}) => {
  return (
    <OptionalLinkWrapper href={href}>
      <button
        type='button'
        className={cn('flex items-center text-text border-2 outline-none transition-colors', className, {
          'bg-transparent p-2 hover:border-b-main active:text-main active:border-b-main': variant === 'transparent',
          'border-transparent': variant === 'transparent' && !active,
          '!text-main border-transparent border-b-main p-3': variant === 'transparent' && active,
          'rounded-base px-4 py-2.5': variant === 'primary',
          '!text-black bg-border border-border': variant === 'primary' && active,
          'bg-background-tertiary border-background-primary hover:border-main active:border-border active:text-black active:bg-border':
            variant === 'primary' && !active,
          '!text-red': error,
          'gap-x-3.5': onRemove || error,
        })}
        {...rest}
      >
        <h2>{children}</h2>
        {onRemove && (
          <Button
            variant='icon'
            data-testid='remove-tab'
            onClick={e => {
              e.stopPropagation()
              onRemove()
            }}
          >
            <CloseIcon className='stroke-currentColor' />
          </Button>
        )}
        {error && <ErrorIcon className='fill-red' />}
      </button>
    </OptionalLinkWrapper>
  )
}
