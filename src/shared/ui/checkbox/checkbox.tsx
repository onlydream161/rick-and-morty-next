import { forwardRef, InputHTMLAttributes } from 'react'
import cn from 'classnames'
import { FieldError } from 'react-hook-form'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string | JSX.Element
  error?: FieldError
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, label, className = '', error, ...rest }, ref) => {
    return (
      <>
        <div
          className={cn('inline-flex items-center gap-base', {
            [className]: className,
          })}
        >
          <input
            {...rest}
            ref={ref}
            id={name}
            name={name}
            type='checkbox'
            className='custom-checkbox w-[22px] h-[22px] opacity-0 flex-shrink-0'
          />
          <label
            data-testid='checkbox-label'
            htmlFor={name}
            className={cn('relative text-black', {
              'before:border-background-primary': !error,
              'before:border-red': error,
              'text-text-secondary': rest.disabled,
            })}
          >
            <h4>{label}</h4>
          </label>
        </div>
        {error && (
          <p data-testid='checkbox-error-message' className='text-red mt-extra-small'>
            {error.message}
          </p>
        )}
      </>
    )
  }
)
