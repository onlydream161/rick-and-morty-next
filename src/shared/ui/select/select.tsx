import { Combobox, Transition } from '@headlessui/react'
import Arrow from '@/shared/assets/icons/common/arrow.svg'
import Loading from '@/shared/assets/icons/common/loading.svg'
import { ForwardedRef, forwardRef, InputHTMLAttributes, useState, FocusEvent } from 'react'
import SearchSVG from '@/shared/assets/icons/common/search.svg'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'

export interface SelectOption {
  id: number | string
  label: string
}

export interface SelectProps<T> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onSelect'> {
  showSearch?: boolean
  onlySearch?: boolean
  prefix?: string
  searchValue?: string
  value?: T
  options?: SelectOption[]
  className?: string
  hidden?: boolean
  isLoading?: boolean
  onChange?: (selected?: T) => void
  onSearch?: (value: string) => void
}

const SelectComponent = <T extends string | number>(
  {
    showSearch,
    onlySearch,
    prefix = '',
    searchValue,
    value,
    options,
    className = '',
    hidden,
    isLoading,
    onChange,
    onSearch,
    ...rest
  }: SelectProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { t } = useTranslation('common')
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Combobox value={value} onChange={e => onChange?.(e)}>
      {({ open }) => (
        <div className={'group relative w-full ' + className}>
          {showSearch ? (
            <div
              className={cn('group flex items-center w-full h-[44px] gap-base py-2 px-base rounded-base', {
                'bg-transparent placeholder:text-transparent group-hover:bg-background-hover': hidden && !searchValue,
                'bg-background-hover placeholder:text-gray': searchValue || isFocused || !hidden,
                [className]: className,
              })}
            >
              <Combobox.Input
                {...rest}
                ref={ref}
                type='text'
                className={cn(
                  `caret-primary focus:outline-none w-full text-subtext
                    text-white group-hover:text-primary group-hover:placeholder:text-primary transition-colors duration-100
                    placeholder:transition-colors placeholder:duration-100`,
                  {
                    'bg-background-hover': !hidden,
                    'bg-transparent': hidden,
                  }
                )}
                onFocus={(e: FocusEvent<HTMLInputElement, Element>) => {
                  setIsFocused(true)
                  rest.onFocus?.(e)
                }}
                onBlur={(e: FocusEvent<HTMLInputElement, Element>) => {
                  setIsFocused(false)
                  rest.onBlur?.(e)
                }}
                displayValue={(value: T) => options?.find(option => option.id === value)?.label || searchValue || ''}
                onChange={e => {
                  onSearch?.(e.target.value)
                }}
              />
              <Combobox.Button>
                <SearchSVG
                  className={cn(
                    ' h-4 w-4 cursor-pointer stroke-white group-hover:stroke-primary transition-colors duration-100',
                    {
                      '!stroke-primary': hidden || isFocused,
                    }
                  )}
                />
              </Combobox.Button>
            </div>
          ) : (
            <Combobox.Button
              className={cn(
                `flex items-center justify-between w-full input-focus focus-visible:ring-primary bg-background-hover
              rounded-base h-[44px] text-left px-4 py-2 text-gray text-subtext`,
                {
                  ['text-primary']: value,
                }
              )}
            >
              <div
                className={cn('overflow-hidden text-ellipsis whitespace-nowrap max-w-[calc(100%-1.25rem)]', {
                  ['text-primary']: value,
                  ['text-gray']: !value,
                })}
              >
                <span className='text-white group-hover:text-primary group-active:text-primary'>{`${prefix}: `}</span>
                <span className=''>{options?.find(option => option.id === value)?.label || 'Не выбрано'}</span>
              </div>
              <Arrow className='fill-white group-hover:fill-primary w-[13px] h-[13px] -rotate-90 group-active:fill-primary' />
            </Combobox.Button>
          )}
          {onlySearch || (!searchValue && showSearch) || (
            <Transition
              show={open}
              unmount={false}
              enter='list-transition'
              enterFrom='scale-y-95 opacity-0'
              enterTo='scale-y-100 opacity-100'
              leave='list-transition'
              leaveFrom='scale-y-100 opacity-100'
              leaveTo='scale-y-95 opacity-0'
              className='absolute z-10 w-full border bg-background-hover dark:border-gray border-primary px-small mt-extra-small rounded-base will-change-transform'
            >
              {isLoading ? (
                <Loading className='mx-auto fill-primary h-10 py-[10px] animate-spin' />
              ) : options?.length ? (
                <Combobox.Options
                  static
                  className='relative scrollbar-dropdown dark:scrollbar-dropdown-gray max-h-40 overflow-auto py-[10px] pr-[5px] input-focus'
                >
                  {options?.map(option => (
                    <Combobox.Option key={option.id} value={option.id}>
                      {({ active, selected }) => (
                        <div
                          className={cn(
                            'relative flex items-center h-[35px] px-small py-1 text-white cursor-pointer rounded-[5px] text-subtext',
                            {
                              ['bg-lines dark:bg-background-primary !text-primary']: selected,
                              ['!text-primary']: active,
                            }
                          )}
                        >
                          {option.label}
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              ) : (
                <div className='min-h-[55px] py-[14px] px-5 text-gray text-subtext'>{t('emptyRequest')}</div>
              )}
            </Transition>
          )}
        </div>
      )}
    </Combobox>
  )
}

export const Select = forwardRef(SelectComponent) as <T>(
  props: SelectProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof SelectComponent>
