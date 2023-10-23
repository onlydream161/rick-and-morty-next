import { forwardRef, InputHTMLAttributes, useRef, useState, ReactElement, MouseEvent, useEffect } from 'react'
import { Nullable } from '@/shared/@types'
import { Button } from '../button'
import { FieldError } from 'react-hook-form'
import { useAfterMountEffect } from '@/shared/hooks'
import SearchIcon from '@/shared/assets/icons/common/search.svg'
import CloseIcon from '@/shared/assets/icons/common/close.svg'
import CloseEyeIcon from '@/shared/assets/icons/common/close-eye.svg'
import OpenEyeIcon from '@/shared/assets/icons/common/open-eye.svg'
import DatePickerIcon from '@/shared/assets/icons/common/datepicker.svg'
import Loading from '@/shared/assets/icons/common/loading.svg'
import SuccessIcon from '@/shared/assets/icons/common/success.svg'
import Skeleton from 'react-loading-skeleton'
import cn from 'classnames'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string
  type?: InputHTMLAttributes<HTMLInputElement>['type'] | 'datepicker' | 'selectSearch'
  label?: string
  defaultValue?: string
  error?: Nullable<FieldError>
  isDropdownOpen?: boolean
  labelClassName?: string
  inputClassName?: string
  isSaved?: boolean
  isFilter?: boolean
  isLoading?: boolean
  extraContent?: ReactElement
  inputWrapperClassName?: string
  resetTrigger?: string
  reset?: () => void
  onSuccess?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      type = 'text',
      error,
      isDropdownOpen,
      className,
      labelClassName,
      inputClassName,
      isSaved,
      isFilter = false,
      isLoading,
      inputWrapperClassName,
      extraContent,
      resetTrigger,
      reset,
      onSuccess,
      ...rest
    },
    ref
  ) => {
    const innerRef = useRef<Nullable<HTMLInputElement>>(null)
    const isFirstRender = useRef(true)

    const [isFocused, setIsFocused] = useState(false)
    const [value, setValue] = useState(() => rest.value || rest.defaultValue)
    const [isOpen, setOpen] = useState(false)

    rest.disabled = rest.disabled && !isSaved

    const isTypeNumber = type === 'number'
    const isFilled = value || typeof value === 'number'
    const isActive = isFocused || isFilled || isDropdownOpen
    const isSearch = type === 'search'
    const isAdd = !!onSuccess
    const withoutLabel = isSearch || isAdd || isFilter
    // Если сделать через date, то будет ненужная логика дефолтного datepicker
    const isDatePicker = type === 'datepicker'
    const isSelect = type === 'select' || isDatePicker
    const isPassword = type === 'password'
    const isSelectSearch = type === 'selectSearch'
    const withDropdown = isSelect || isSelectSearch

    const PasswordIcon = isOpen ? OpenEyeIcon : CloseEyeIcon

    const placeholder = withoutLabel ? label : isSelectSearch ? rest.placeholder : ''

    const onClear = (event?: MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation()
      if (innerRef.current) {
        Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set?.call(innerRef.current, '')
        innerRef.current.dispatchEvent(new Event('change', { bubbles: true }))
      }
      reset?.()
    }

    useEffect(() => {
      setValue(isSaved && !rest.value && !isTypeNumber ? '—' : rest.value)
    }, [rest.value, isSaved])

    useAfterMountEffect(() => {
      rest.disabled && rest.value && onClear()
    }, [rest.disabled])

    useEffect(() => {
      if (!isFirstRender.current) {
        if (rest.value) {
          onClear()
        } else {
          isFirstRender.current = true
        }
      } else if (resetTrigger) {
        isFirstRender.current = false
      }
    }, [resetTrigger])

    return (
      <div className={cn('flex flex-col w-full gap-y-1 h-fit', className)}>
        <div
          className={cn(
            `group relative flex items-center gap-small transition-[margin,colors] w-full text-black border-2 
           rounded-base outline-none`,
            {
              'border-border bg-white':
                !(isFocused || isFilled || rest.disabled) || (isSelect && isFocused && !isFilled),
              'border-gray bg-gray-secondary': !isFocused && !isDropdownOpen && isFilled,
              'border-main bg-white': isFocused,
              'border-gray bg-background': withDropdown && isFilled && isDropdownOpen,
              'border-red': error,
              'border-none px-0 py-2.5 bg-transparent': isSaved,
              'px-[18px] py-2': !isSaved,
              'bg-gray-secondary border-border cursor-not-allowed': rest.disabled,
              'hover:border-main': !rest.disabled,
              'cursor-text': (!rest.disabled && isSaved) || isFilter,
              'cursor-pointer': !rest.disabled && !isSaved && isSelect,
              'mt-medium': !withoutLabel,
            },
            inputWrapperClassName
          )}
          tabIndex={0}
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
        >
          <label
            htmlFor={name}
            className={cn(
              'absolute pointer-events-none transition-transform',
              {
                'text-text-secondary': !rest.disabled,
                'text-gray': rest.disabled,
                'translate-x-[18px] translate-y-3 left-0 top-0': !isActive || ((isSelect || isDatePicker) && !isFilled),
                '-translate-y-full -top-1.5 -left-0.5': ((isActive && !isSelect) || (isSelect && isFilled)) && !isSaved,
                '-translate-y-full -left-0 -top-1 translate-x-0': isSaved,
                hidden: withoutLabel,
              },
              labelClassName
            )}
          >
            <h3 className='font-normal'>{label}</h3>
          </label>
          {isSaved ||
            ((isSearch || (isSelectSearch && (isFocused || isDropdownOpen))) && (
              <Button
                variant='icon'
                disabled={rest.disabled}
                className='flex-shrink-0'
                onClick={event => event?.stopPropagation()}
              >
                <SearchIcon className='stroke-currentColor' />
              </Button>
            ))}
          {isSaved &&
            (isLoading ? (
              <Skeleton height={29} containerClassName='w-full' />
            ) : (
              <h4 {...rest}>{value || (value === 0 ? 0 : '—')}</h4>
            ))}
          {!isSaved && (
            <>
              <input
                {...rest}
                ref={instance => {
                  innerRef.current = instance
                  if (typeof ref === 'function') {
                    ref(instance)
                  } else if (ref?.current || ref?.current === null) {
                    ref.current = instance
                  }
                }}
                id={name}
                name={name}
                type={isOpen ? 'text' : type}
                value={value}
                placeholder={placeholder}
                autoComplete={isPassword ? 'new-password' : 'off'}
                readOnly={rest.readOnly || isSaved}
                className={cn(
                  `w-full flex-grow bg-transparent text-h4 placeholder:text-h4 placeholder:text-text-secondary disabled:placeholder:text-gray
            placeholder:transition-opacity cursor-inherit disabled:cursor-not-allowed outline-none`,
                  {
                    'placeholder:opacity-0': isSelectSearch && !isActive,
                  },
                  inputClassName
                )}
                onFocus={e => {
                  rest.onFocus?.(e)
                  setIsFocused(true)
                }}
                onBlur={e => {
                  rest?.onBlur?.(e)
                  setIsFocused(false)
                }}
                onChange={e => {
                  rest?.onChange?.(e)
                  setValue(e.target.value)
                }}
                onWheel={e => type === 'number' && e.currentTarget.blur()}
              />
              {isAdd && isFilled && !isLoading && (
                <Button
                  variant='icon'
                  data-testid='input-on-success-button'
                  disabled={rest.disabled}
                  onClick={event => [event?.stopPropagation(), onSuccess()]}
                  className='flex-shrink-0'
                >
                  <SuccessIcon className='stroke-currentColor' />
                </Button>
              )}
              {isFilled && !isLoading && (
                <Button
                  data-testid='reset-button'
                  variant='icon'
                  disabled={rest.disabled}
                  onClick={onClear}
                  className='flex-shrink-0'
                >
                  <CloseIcon className='stroke-currentColor' />
                </Button>
              )}
              {isLoading && <Loading className='h-6 fill-main animate-spin' />}
              {isPassword && (
                <Button
                  variant='icon'
                  disabled={rest.disabled}
                  onClick={event => [event?.stopPropagation(), setOpen(prev => !prev)]}
                  className='flex-shrink-0'
                >
                  <PasswordIcon className='stroke-currentColor' />
                </Button>
              )}
              {isDatePicker && (
                <Button variant='icon' disabled={rest.disabled} className='flex-shrink-0'>
                  <DatePickerIcon className='stroke-currentColor' />
                </Button>
              )}
              {extraContent}
            </>
          )}
        </div>
        {error && <h4 className='text-left text-red'>{error.message}</h4>}
        {/* Вернуть, если понадобится */}
        {/* {isPassword && passwordStrength && <PasswordStrength password={value} className='mt-small' />} */}
      </div>
    )
  }
)

{
  /* Вернуть, если понадобится */
}
// interface PasswordStrengthProps {
//   password?: string
// }

// const PasswordStrength: FCWithClassName<PasswordStrengthProps> = memo(({ password, className }) => {
//   const { t } = useTranslate(['common'])

//   if (!password) {
//     return null
//   }

//   const passwordStrengthParams = ((value: string) => {

//     if (STRONG_PASSWORD_REG_EXP.test(value)) {
//       return {
//         text: t('strongPassword'),
//         color: 'rgba(var(--green))',
//         lineLength: '100%',
//       }
//     }
//     if (MEDIUM_PASSWORD_REG_EXP.test(value)) {
//       return {
//         text: t('mediumPassword'),
//         color: 'rgba(var(--main-hover))',
//         lineLength: '60%',
//       }
//     }
//     return {
//       text: t('weakPassword'),
//       color: 'rgba(var(--red))',
//       lineLength: '30%',
//     }
//   })(password)

//   return (
//     <div className={cn('flex items-center justify-between gap-small', className)}>
//       <div
//         style={{ width: passwordStrengthParams.lineLength, backgroundColor: passwordStrengthParams.color }}
//         className='h-0.5 rounded-sm'
//       />
//       <h4 style={{ color: passwordStrengthParams.color }}>{passwordStrengthParams.text}</h4>
//     </div>
//   )
// })
