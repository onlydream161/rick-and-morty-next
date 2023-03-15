import { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { Nullable } from '@/shared/@types'

export interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label?: string
  defaultValue?: string
  error?: boolean
  errorMessage?: string
  className?: string
  labelClassName?: string
  textareaClassName?: string
  resizable?: boolean
  autosize?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      name,
      label,
      className,
      labelClassName,
      textareaClassName,
      resizable,
      autosize = false,
      error,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    const innerRef = useRef<Nullable<HTMLTextAreaElement>>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [value, setValue] = useState(rest.defaultValue)

    useEffect(() => {
      const textarea = innerRef.current
      const onChange = (e: Event | HTMLTextAreaElement) => {
        const element = ((e as Event).target as HTMLTextAreaElement) || e
        element.style.cssText = 'height:auto'
        element.style.cssText = 'height:' + element.scrollHeight + 'px'
      }
      const resizeObserver = new ResizeObserver(entries => onChange(entries[0].target as HTMLTextAreaElement))
      if (textarea && autosize) {
        textarea.addEventListener('input', onChange)
        resizeObserver.observe(textarea)
      }
      return () => {
        if (textarea) {
          textarea.removeEventListener('input', onChange)
          resizeObserver.unobserve(textarea)
        }
      }
    }, [autosize])

    const isFilled = value || rest.value
    const isActive = isFocused || isFilled

    return (
      <div className={cn('relative flex flex-col w-full transition-[margin,colors] mt-medium', className)}>
        <label
          htmlFor={name}
          className={cn(
            'absolute left-0 top-0 pointer-events-none transition-transform',
            {
              'text-text-secondary cursor-text': !rest.disabled,
              'text-background-primary cursor-not-allowed': rest.disabled,
              '-translate-y-full -top-1': isActive,
              'translate-x-5 translate-y-3': !isActive,
            },
            labelClassName
          )}
        >
          <h3 className='font-normal'>{label}</h3>
        </label>
        <textarea
          {...rest}
          ref={instance => {
            innerRef.current = instance
            typeof ref === 'function' && ref(instance)
          }}
          id={name}
          name={name}
          className={cn(
            `w-full bg-white disabled:bg-background-secondary text-black disabled:text-background-primary
             border-2 hover:border-main focus:border-main disabled:border-border disabled:cursor-not-allowed
             rounded-base px-[18px] py-2 outline-none transition-colors text-h4`,
            {
              'border-border': !(isFilled && !isFocused),
              'border-background-primary bg-background-secondary': isFilled && !isFocused,
              'border-red': error,
              'resize-none': !resizable,
            },
            textareaClassName
          )}
          onFocus={e => {
            setIsFocused(true)
            rest.onFocus?.(e)
          }}
          onBlur={e => {
            setIsFocused(false)
            rest?.onBlur?.(e)
          }}
          onChange={e => {
            rest?.onChange?.(e)
            setValue(e.target.value)
          }}
        />
        {error && <h4 className='mt-1 text-red'>{errorMessage}</h4>}
      </div>
    )
  }
)
