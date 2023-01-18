import { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { Nullable, PropsWithClassName } from '@/shared/@types'

export interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label?: string
  error?: boolean
  errorMessage?: string
  textareaStyle?: string
  resizable?: boolean
  autosize?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, PropsWithClassName<TextareaProps>>(
  (
    { name, label, className = '', textareaStyle = '', resizable, autosize = true, error, errorMessage, ...rest },
    ref
  ) => {
    const innerRef = useRef<Nullable<HTMLTextAreaElement>>(null)
    const [isFocused, setIsFocused] = useState(false)

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

    return (
      <div className='flex flex-col w-full group text-subtext'>
        <label
          htmlFor={name}
          className={cn('group-hover:text-primary', {
            'text-gray': !isFocused,
            'text-primary': isFocused,
            'group-hover:text-gray': rest.disabled,
            '!text-red group-hover:text-red': error,
          })}
        >
          {label}
        </label>
        <div className={cn('relative input-focus bg-background-hover rounded-base', className)}>
          <textarea
            {...rest}
            ref={instance => {
              innerRef.current = instance
              typeof ref === 'function' && ref(instance)
            }}
            id={name}
            name={name}
            className={cn(
              `relative block input-focus border border-transparent bg-background-hover w-full min-h-[2.5rem] h-full px-small py-[10px]
            overflow-hidden focus-visible:ring-primary rounded-base caret-primary focus:text-white group-hover:text-primary disabled:border-background-hover
            disabled:text-gray disabled:cursor-not-allowed disabled:group-hover:text-gray`,
              textareaStyle,
              {
                'resize-none': !resizable,
                'group-hover:text-red focus:text-red caret-red focus-visible:ring-transparent !border-red': error,
              }
            )}
            onFocus={e => {
              setIsFocused(true)
              rest.onFocus?.(e)
            }}
            onBlur={e => {
              setIsFocused(false)
              rest?.onBlur?.(e)
            }}
          />
        </div>
        {error && <p className='text-red mt-[3px]'>{errorMessage}</p>}
      </div>
    )
  }
)
