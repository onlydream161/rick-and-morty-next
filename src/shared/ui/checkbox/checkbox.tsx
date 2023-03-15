import { forwardRef, InputHTMLAttributes } from 'react'
import cn from 'classnames'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string | JSX.Element
  error?: boolean
  errorMessage?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, label, className = '', error, errorMessage, ...rest }, ref) => {
    return (
      <>
        <div className={cn('inline-flex items-center gap-small', className)}>
          <input
            {...rest}
            ref={ref}
            id={name}
            name={name}
            type='checkbox'
            className={cn('custom-checkbox w-[15px] h-[15px] opacity-0 flex-shrink-0', {
              'custom-checkbox-error': error,
            })}
          />
          <label
            data-testid='checkbox-label'
            htmlFor={name}
            className={cn('relative text-subtext', {
              'text-red': error,
              'text-white': !error,
            })}
          >
            {label}
          </label>
        </div>
        {error && (
          <p data-testid='checkbox-error-message' className='text-red mt-small'>
            {errorMessage}
          </p>
        )}
      </>
    )
  }
)
