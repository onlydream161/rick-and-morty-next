import { useEffect, useMemo, useRef, useState } from 'react'
import RcSelect, { Option, SelectProps as RcSelectProps } from 'rc-select'
import { BaseEntity, CustomSelectOption, Nullable, SelectOption } from '@/shared/@types'
import { httpClient, notify, useTranslate } from '@/shared/lib'
import { Input, InputProps } from '../input'
import { Button } from '../button'
import { AxiosError } from 'axios'
import { useAfterMountEffect } from '@/shared/hooks'
import Loading from '@/shared/assets/icons/common/loading.svg'
import ArrowIcon from '@/shared/assets/icons/common/select-arrow.svg'
import AddIcon from '@/shared/assets/icons/common/add.svg'
import cn from 'classnames'

export interface SelectSearchProps<T = Nullable<string | number>>
  extends Omit<RcSelectProps, 'value' | 'onChange' | 'onSelect'> {
  name: string
  label?: string
  value?: T
  spareValue?: string
  options?: SelectOption[]
  isSaved?: boolean
  isFilter?: boolean
  inputProps?: Omit<InputProps, 'name'>
  customSelectOptionValuekey?: string
  withOptionAddition?: boolean
  source?: string
  dependentField?: Record<string, string | number | CustomSelectOption | undefined>
  className?: string
  isLoading?: boolean
  onChange?: (selected?: T) => void
  onAdd?: () => void
}

export const SelectSearch = <T extends Nullable<string | number | CustomSelectOption>>({
  name,
  label,
  value,
  spareValue = '',
  defaultValue,
  disabled,
  options = [],
  isSaved,
  inputProps,
  withOptionAddition,
  customSelectOptionValuekey = 'name',
  dependentField,
  source,
  isLoading,
  className,
  onChange,
  onSearch,
  isFilter,
  onAdd,
  ...rest
}: SelectSearchProps<T>) => {
  const { t } = useTranslate(['common'])

  const inputRef = useRef<HTMLInputElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [currentValue, setCurrentValue] = useState<string>()
  const [isAddMode, setIsAddMode] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [customSelectOptions, setCustomSelectOptions] = useState<SelectOption[]>([])
  const [isCustomOptionLoading, setIsCustomOptionLoading] = useState(false)

  const isAddInputTypeNumber = inputProps?.type === 'number'

  const onSuccess = async () => {
    try {
      setIsCustomOptionLoading(true)
      const value = isAddInputTypeNumber ? inputRef.current?.valueAsNumber : inputRef.current?.value
      const { data } = await httpClient<CustomSelectOption & BaseEntity, CustomSelectOption>({
        url: source,
        method: 'POST',
        data: {
          [customSelectOptionValuekey]: value || '',
          ...(dependentField && dependentField),
        },
      })
      setCustomSelectOptions(prev => [
        ...prev,
        {
          id: data['@id'],
          label: String(value),
        },
      ])
      onChange?.(data['@id'] as T)
      setIsAddMode(false)
      setIsOpen(false)
    } catch (error) {
      if ((error as AxiosError).response?.status === 422) {
        return notify(t('This value is already in use'), { status: 'error' })
      }
      return notify('Server error text', { status: 'error' })
    } finally {
      setIsCustomOptionLoading(false)
    }
  }

  const summaryOptions = useMemo(
    () =>
      [...options, ...customSelectOptions].filter(
        (value, index, self) => self.findIndex(t => t.id === value.id) === index
      ),
    [options, customSelectOptions]
  )

  useEffect(() => {
    isAddMode && inputRef.current?.focus()
  }, [isAddMode])

  useEffect(() => {
    !isOpen && !isCustomOptionLoading && setIsAddMode(false)
  }, [isOpen, isCustomOptionLoading])

  useEffect(() => {
    if (!isOpen) setSearchValue('')
  }, [isOpen])

  useAfterMountEffect(() => {
    if (!isOpen) onSearch?.('')
  }, [isOpen])

  useAfterMountEffect(() => {
    if (!isOpen && !value) {
      setCurrentValue('')
    }
  }, [value, isOpen])

  return (
    <RcSelect
      mode='combobox'
      value={
        searchValue ||
        summaryOptions?.find(option =>
          String(option.id).includes(String((value as CustomSelectOption)?.['@id'] || value))
        )?.label ||
        currentValue ||
        spareValue
      }
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
          isFilter={isFilter}
          isLoading={isLoading}
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
          reset={() => [onChange?.(null as T), setSearchValue(''), setCurrentValue(''), setCustomSelectOptions([])]}
          type='selectSearch'
          {...inputProps}
          className={cn(
            'w-full',
            {
              '!cursor-text': isSaved,
            },
            inputProps?.className
          )}
        />
      )}
      onSelect={value => {
        setCurrentValue(summaryOptions.find(option => option.id === value)?.label)
        onChange?.(value as T)
      }}
      onSearch={search => [
        onSearch?.(search),
        setSearchValue(search),
        setCustomSelectOptions([]),
        onChange?.(null as T),
      ]}
      onDropdownVisibleChange={setIsOpen}
      // Вынести в отдельную компоненту, если понадобится в Select
      dropdownRender={menu => (
        <>
          {menu}
          {withOptionAddition && (
            <div className='mt-2.5 p-small -mx-small -mb-small rounded-b-xl shadow-notification'>
              {isAddMode ? (
                <Input
                  ref={inputRef}
                  name={name + '-add-option'}
                  type={inputProps?.type}
                  label={t('Enter a value')}
                  isLoading={isCustomOptionLoading}
                  onSuccess={onSuccess}
                  reset={() => setIsAddMode(false)}
                  onKeyDown={e => e.key === 'Enter' && inputRef.current?.value && onSuccess()}
                />
              ) : (
                <Button
                  variant='text'
                  color='secondary'
                  onClick={() => (onAdd ? [onAdd(), setIsOpen(false)] : setIsAddMode(true))}
                  className='px-5 py-3.5'
                  childrenClassName='flex items-center gap-small'
                >
                  <AddIcon className='stroke-currentColor' />
                  <h3> {t('Other')}</h3>{' '}
                </Button>
              )}
            </div>
          )}
        </>
      )}
      {...rest}
    >
      {isLoading ? (
        <Option className='pointer-events-none'>
          <Loading className='h-[29px] fill-main mx-auto animate-spin' />
        </Option>
      ) : summaryOptions?.length ? (
        summaryOptions?.map(option => (
          <Option
            key={`${option.id}`}
            value={option.id}
            label={option.label}
            data-testid='select-search-option'
            className={cn('cursor-pointer', {
              'rc-select-item-option-selected': option.id === ((value as CustomSelectOption)?.['@id'] || value),
            })}
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
