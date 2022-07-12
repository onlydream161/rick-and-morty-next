import { forwardRef, InputHTMLAttributes } from 'react'
import cn from 'classnames'
import { RegisterOptions } from 'react-hook-form'
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  rules?: RegisterOptions
  error?: boolean
  label?: string | JSX.Element
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, label, className = '', error, ...rest }, ref) => {
    return (
      <div
        className={cn('inline-flex items-center gap-small', {
          [className]: className,
        })}
      >
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
          htmlFor={name}
          className={cn('relative text-subtext', {
            'text-red': error,
            'text-white': !error,
          })}
        >
          {label}
        </label>
      </div>
    )
  }
)
