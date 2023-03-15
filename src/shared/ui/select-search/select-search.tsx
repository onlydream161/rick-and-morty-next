import { useEffect, useRef, useState } from 'react'
import RcSelect, { Option, SelectProps as RcSelectProps } from 'rc-select'
import { Nullable, SelectOption } from '@/shared/@types'
import { useTranslate } from '@/shared/lib'
import { Input, InputProps } from '../input'
import { Button } from '../button'
import Loading from '@/shared/assets/icons/common/loading.svg'
import ArrowIcon from '@/shared/assets/icons/common/select-arrow.svg'
import cn from 'classnames'

export interface SelectSearchProps<T = Nullable<string | number>>
  extends Omit<RcSelectProps, 'value' | 'onChange' | 'onSelect'> {
  name: string
  label?: string
  value?: T
  options?: SelectOption[]
  isSaved?: boolean
  inputProps?: Omit<InputProps, 'name'>
  className?: string
  isLoading?: boolean
  onChange?: (selected?: T) => void
}

export const SelectSearch = <T extends Nullable<string | number>>({
  name,
  label,
  value,
  defaultValue,
  disabled,
  options = [],
  isSaved,
  inputProps,
  isLoading,
  className,
  onChange,
  onSearch,
  ...rest
}: SelectSearchProps<T>) => {
  const { t } = useTranslate(['common'])

  const inputRef = useRef<HTMLInputElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [isAddMode, setIsAddMode] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    isAddMode && inputRef.current?.focus()
  }, [isAddMode])

  useEffect(() => {
    isOpen || setIsAddMode(false)
  }, [isOpen])

  return (
    <RcSelect
      mode='combobox'
      value={options?.find(option => option.id === value)?.label || searchValue}
      searchValue={searchValue}
      className={className}
      disabled={disabled || isSaved}
      open={isOpen}
      getInputElement={() => (
        <Input
          name={name}
          label={label}
          placeholder={t('Search')}
          isSaved={isSaved}
          isDropdownOpen={isOpen}
          disabled={disabled}
          extraContent={
            <Button
              variant='icon'
              data-testid='select-search-dropdown-button'
              disabled={disabled}
              onMouseDown={e => [e.stopPropagation(), setIsOpen(prev => !prev)]}
            >
              <ArrowIcon className={cn('stroke-currentColor transition-transform', { 'rotate-180': isOpen })} />
            </Button>
          }
          reset={() => [onChange?.(null as T), setSearchValue('')]}
          {...inputProps}
          type='selectSearch'
          className={cn(
            'w-full',
            {
              '!cursor-text': isSaved,
            },
            inputProps?.className
          )}
        />
      )}
      onSelect={value => onChange?.(value as T)}
      onSearch={value => [onSearch?.(value), setSearchValue(value)]}
      onDropdownVisibleChange={setIsOpen}
      {...rest}
    >
      {isLoading ? (
        <Option className='pointer-events-none'>
          <Loading className='h-[29px] fill-main mx-auto animate-spin' />
        </Option>
      ) : options?.length ? (
        options?.map(option => (
          <Option
            key={`${option.id}`}
            value={option.id}
            label={option.label}
            className={cn('cursor-pointer', { 'rc-select-item-option-active': option.id === value })}
          >
            <h4>{option.label}</h4>
          </Option>
        ))
      ) : (
        <Option className='pointer-events-none'>
          <h4 className='!text-text-secondary pointer-events-none'>{t('EmptyRequest')}</h4>
        </Option>
      )}
    </RcSelect>
  )
}
