import { ButtonHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'
import Loading from '@/shared/assets/icons/common/loading.svg'
import { OptionalLinkWrapper } from '@/shared/lib'

export type Variant = 'primary' | 'secondary' | 'outlined' | 'inverse' | 'inverseOutlined'
export type Scale = 'default' | 'large'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  scale?: Scale
  loading?: boolean
  className?: string
  href?: string
  newTab?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', scale = 'default', type = 'button', className = '', loading, ...rest }, ref) => {
    return (
      <OptionalLinkWrapper {...rest} href={rest.href}>
        <button
          ref={ref}
          className={cn(
            `relative flex items-center text-[#fff] hover:text-[#fff] active:text-[#fff] disabled:text-background-hover justify-center min-h-[57px]
          px-10 rounded-base transition-colors duration-100 shadow-[0px_1px_14px_transparent] active:hover:shadow-none disabled:cursor-not-allowed
          will-change-contents`,
            {
              'bg-primary text-[#fff] hover:shadow-primary/50 active:bg-button-press-primary': variant === 'primary',
              'bg-secondary text-[#fff] hover:shadow-secondary/50 active:bg-button-press-secondary':
                variant === 'secondary',
              [`bg-transparent border border-primary !text-white hover:!text-primary active:border-button-press-primary active:!text-button-press-primary
            disabled:border-gray disabled:!text-gray`]: variant === 'outlined',
              '!bg-gray text-background-hover !shadow-[transparent]':
                rest.disabled && (variant === 'primary' || variant === 'secondary'),
              [`bg-[#fff] text-primary hover:shadow-[0px_1px_14px_#FFFFFF] active:bg-[#F1F3FF]
      disabled:text-gray disabled:hover:shadow-[transparent] disabled:active:bg-[#fff]`]: variant === 'inverse',
              [`bg-transparent border border-[#fff] text-[#fff] hover:shadow-[0px_1px_10px_#FFFFFF] active:border-button-press-primary
      active:text-button-press-primary disabled:border-gray disabled:hover:shadow-[transparent] disabled:active:border-gray
      disabled:active:text-[#fff]`]: variant === 'inverseOutlined',
              'px-[60px] min-h-[37px]': variant === 'inverse' || variant === 'inverseOutlined',
              'px-5 min-h-[37px]': scale === 'default',
              'pointer-events-none': loading,
              [className]: className,
            }
          )}
          type={type}
          {...rest}
        >
          {
            <Loading
              className={cn('absolute fill-[#fff] h-[39px] animate-spin', {
                '!fill-primary': variant === 'outlined' || variant === 'inverse',
                '!fill-gray':
                  rest.disabled && (variant === 'outlined' || variant === 'inverse' || variant === 'inverseOutlined'),
                'h-[20px]': scale === 'default' || variant === 'inverse' || variant === 'inverseOutlined',
                hidden: !loading,
              })}
            />
          }
          <span
            className={cn('transition-opacity duration-100', {
              'opacity-0': loading,
              'text-base': scale === 'large',
              'text-subtext': scale === 'default' || variant === 'inverse' || variant === 'inverseOutlined',
            })}
          >
            {children}
          </span>
        </button>
      </OptionalLinkWrapper>
    )
  }
)
