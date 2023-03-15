import { ButtonHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'
import Loading from '@/shared/assets/icons/common/loading.svg'
import { OptionalLinkWrapper } from '@/shared/lib'

export type Variant = 'contained' | 'outlined' | 'text' | 'icon' | 'border-icon'
type Color = 'primary' | 'secondary'
export type Size = 'small' | 'medium' | 'large'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  color?: Color
  fullWidth?: boolean
  loading?: boolean
  className?: string
  childrenClassName?: string
  href?: string
  newTab?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'contained',
      color = 'primary',
      size = 'medium',
      fullWidth,
      type = 'button',
      className,
      childrenClassName,
      loading,
      ...rest
    },
    ref
  ) => {
    return (
      <OptionalLinkWrapper {...rest} href={rest.href}>
        <button
          ref={ref}
          className={cn(
            'group relative flex items-center justify-center rounded-base disabled:cursor-not-allowed transition-colors',
            {
              'disabled:bg-white disabled:text-background-primary disabled:border-border': variant !== 'contained',
              'disabled:bg-background-secondary disabled:text-background-primary disabled:border-background-secondary':
                variant === 'contained',
              'bg-main-secondary text-main border border-main hover:bg-main hover:text-white active:bg-red active:border-red':
                color === 'primary' && (variant === 'outlined' || variant === 'border-icon'),
              'bg-background-quaternary text-black border border-background-primary hover:bg-border active:bg-background-primary':
                color === 'secondary' && (variant === 'outlined' || variant === 'border-icon'),
              'bg-main text-white border border-main hover:bg-main-hover hover:border-main-hover active:bg-red active:border-red':
                variant === 'contained',
              'text-main active:text-red': color === 'primary' && variant === 'text',
              'disabled:bg-transparent text-secondary-secondary hover:text-black':
                (color === 'secondary' && variant === 'text') || variant === 'icon',
              'p-px': size === 'small' && variant === 'border-icon',
              'p-3': size === 'medium' && variant === 'border-icon',
              'px-base py-[10.5px]': size === 'medium' && (variant === 'contained' || variant === 'outlined'),
              'px-10 py-[13.5px]': size === 'large' && (variant === 'contained' || variant === 'outlined'),
              'p-0': variant === 'text',
              'w-full': fullWidth,
              'w-fit': !fullWidth,
              'pointer-events-none': loading,
            },
            className
          )}
          type={type}
          {...rest}
        >
          {
            <Loading
              data-testid='loading-button-icon'
              className={cn('absolute animate-spin group-disabled:fill-background-primary', {
                'fill-main': color === 'primary' && variant !== 'contained',
                'fill-white': color === 'primary' && variant === 'contained',
                'fill-black': color === 'secondary' && (variant === 'outlined' || variant === 'border-icon'),
                'fill-secondary-hover': (color === 'secondary' && variant === 'text') || variant === 'icon',
                'h-[29px]': (size === 'large' || size === 'medium') && variant !== 'icon',
                'h-4': size === 'small' || variant === 'icon',
                hidden: !loading,
              })}
            />
          }
          <span
            data-testid='button-children-wrapper'
            className={cn(
              'no-underline transition-opacity duration-100',
              {
                'opacity-0': loading,
              },
              childrenClassName
            )}
          >
            {children}
          </span>
        </button>
      </OptionalLinkWrapper>
    )
  }
)
