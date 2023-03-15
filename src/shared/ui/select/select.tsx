import { useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Nullable, SelectOption } from '@/shared/@types'
import { useTranslate } from '@/shared/lib'
import { Input, InputProps } from '../input'
import { Button } from '../button'
import Loading from '@/shared/assets/icons/common/loading.svg'
import ArrowIcon from '@/shared/assets/icons/common/select-arrow.svg'
import cn from 'classnames'

export interface SelectProps<T> {
  name: string
  label?: string
  value?: Nullable<T>
  defaultValue?: T
  disabled?: boolean
  options?: SelectOption[]
  isSaved?: boolean
  inputProps?: Omit<InputProps, 'name'>
  className?: string
  optionClassName?: string
  isLoading?: boolean
  onChange?: (selected: Nullable<T>) => void
}

export const Select = <T extends string | number>({
  name,
  label,
  value = null,
  defaultValue,
  disabled,
  options,
  isSaved,
  inputProps,
  className,
  optionClassName,
  isLoading,
  onChange,
}: SelectProps<T>) => {
  const { t } = useTranslate(['common'])
  const [optionsListRef, setOptionsListRef] = useState<Nullable<HTMLDivElement>>(null)
  const isScrollable = optionsListRef && optionsListRef.scrollHeight > optionsListRef.clientHeight

  return (
    <Listbox
      as='div'
      defaultValue={defaultValue}
      className={cn('relative w-full outline-none', className)}
      value={value}
      disabled={disabled || isSaved}
      onChange={e => onChange?.(e)}
    >
      {({ open }) => (
        <>
          <Listbox.Button
            className={cn('w-full', {
              'cursor-text': isSaved,
            })}
          >
            <Input
              name={name}
              label={label}
              type='select'
              readOnly
              isSaved={isSaved}
              value={options?.find(option => option.id === value)?.label || ''}
              disabled={disabled}
              isDropdownOpen={open}
              extraContent={
                <Button variant='icon' disabled={disabled}>
                  <ArrowIcon className={cn('stroke-currentColor transition-transform', { 'rotate-180': open })} />
                </Button>
              }
              reset={() => onChange?.(null)}
              {...inputProps}
            />
          </Listbox.Button>
          <Transition
            show={open}
            enterFrom='scale-y-95 opacity-0'
            enterTo='scale-y-100 opacity-100'
            leaveFrom='scale-y-100 opacity-100'
            leaveTo='scale-y-95 opacity-0'
            className={cn(
              'absolute w-full bg-white border border-border p-small mt-1 rounded-xl z-10 overflow-hidden',
              {
                'pr-1': isScrollable,
              }
            )}
          >
            <div ref={setOptionsListRef} className='max-h-[210px] scrollbar-list overflow-auto'>
              {isLoading ? (
                <div className='px-5 py-[10.5px]'>
                  <Loading className='h-[29px] fill-main mx-auto animate-spin' />
                </div>
              ) : options?.length ? (
                <Listbox.Options static className={cn('flex flex-col gap-1 outline-none', { 'pr-1': isScrollable })}>
                  {options?.map(option => (
                    <Listbox.Option key={`${option.id}`} value={option.id} disabled={option.disabled}>
                      {({ active, selected, disabled }) => (
                        <h4
                          className={cn(
                            'px-5 py-[10.5px] cursor-pointer rounded-base',
                            {
                              'bg-background-tertiary': active || selected,
                              'text-black': !disabled,
                              'text-background-primary': disabled,
                            },
                            optionClassName
                          )}
                        >
                          {option.label}
                        </h4>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              ) : (
                <h4 className='px-5 py-[10.5px] text-text-secondary'>{t('EmptyRequest')}</h4>
              )}
            </div>
          </Transition>
        </>
      )}
    </Listbox>
  )
}
