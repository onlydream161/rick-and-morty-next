import { CollectionResponse, CustomSelectOption, Nullable, SelectOption } from '@/shared/@types'
import { normalizeSelectOptions } from '@/shared/helpers'
import { SelectSearchProps, SelectSearch, Select } from '@/shared/ui'
import { useState, useMemo, useCallback } from 'react'
import { FieldError } from 'react-hook-form'
import { QueryParams, QueryWithCollectionResponse, DependentQueryWithCollectionResponse } from './factories'
import { debounce } from 'lodash'

const normalizeDependentEntityValue = (entity: string | CustomSelectOption) =>
  String((entity as CustomSelectOption)?.['@id'] || entity)?.replace?.(/\/\w+\//g, '')

export interface SelectWithQueryProps<R extends CollectionResponse, P extends QueryParams<R>>
  extends Omit<SelectSearchProps, 'dependentField' | 'customSelectOptionValuekey'> {
  type?: 'select' | 'selectSearch'
  subType?: 'text' | 'number'
  dependentEntities?: Record<string, string | CustomSelectOption | undefined>
  dependentEntityType?: 'id' | 'filter'
  labelKey?: string
  transformLabel?: (entity: R['hydra:member'][number]) => string
  valueKey?: string
  params?: P
  value?: string
  error?: FieldError
  useQuery: QueryWithCollectionResponse<R, P> | DependentQueryWithCollectionResponse<R, P>
  onChangeWithOptions?: (options?: Nullable<SelectOption>) => void
  additionalFields?: string[]
  validate?: (item: R['hydra:member'][number]) => boolean
  disableOnEmptyOptions?: boolean
  isLoading?: boolean
}

export const SelectWithQuery = <R extends CollectionResponse, P extends QueryParams<R>>({
  type = 'selectSearch',
  subType = 'text',
  dependentEntities,
  dependentEntityType,
  labelKey = 'name',
  valueKey = '@id',
  transformLabel,
  params = {} as P,
  source,
  error,
  useQuery,
  onChangeWithOptions,
  additionalFields,
  validate,
  disableOnEmptyOptions,
  isLoading,
  ...rest
}: SelectWithQueryProps<R, P>) => {
  const [searchValue, setSearchValue] = useState('')

  const dependentEntitiesIds =
    dependentEntities &&
    Object.values(dependentEntities).reduce<string[]>((acc, entity) => {
      if (entity) {
        acc.push(normalizeDependentEntityValue(entity))
      }
      return acc
    }, [])

  const debouncedOnSearch = useCallback(debounce(setSearchValue, 300), [])

  const isSelectSearch = type === 'selectSearch'

  const disabled = (dependentEntitiesIds && !dependentEntitiesIds.length) || rest.disabled

  const queryParams = {
    enabled: !disabled,
    keepPreviousData: true,
    refetchOnMount: false,
    retry: 3,
    ...params,
    filters: {
      ...(isSelectSearch && { [labelKey]: searchValue }),
      ...(dependentEntityType === 'filter' &&
        dependentEntities &&
        Object.keys(dependentEntities).reduce(
          (acc, key, index) => ({ ...acc, [key]: dependentEntitiesIds?.[index] }),
          {}
        )),
      page: 1,
      itemsPerPage: 100,
      ...params.filters,
    },
    ...(!disabled && { key: dependentEntitiesIds }),
  }

  const { data, isLoading: isOptionLoading } =
    dependentEntityType === 'id'
      ? (useQuery as DependentQueryWithCollectionResponse<R, P>)(dependentEntitiesIds?.[0] || '', queryParams)
      : (useQuery as QueryWithCollectionResponse<R, P>)(queryParams)

  const options = useMemo(
    () =>
      normalizeSelectOptions(
        data?.['hydra:member'],
        { labelKey: transformLabel || labelKey, valueKey, validate },
        additionalFields
      ),
    [data, labelKey, valueKey, transformLabel, validate]
  )

  const getSelectProps = (error?: FieldError) => ({
    options,
    isLoading: isLoading || isOptionLoading,
    inputProps: {
      ...rest.inputProps,
      error,
      type: subType,
      ...(dependentEntitiesIds?.length && { resetTrigger: JSON.stringify(dependentEntitiesIds) }),
    },
    disabled: (disableOnEmptyOptions && !options.length) || disabled,
  })

  const onChange = (value?: Nullable<string | number>) => {
    if (onChangeWithOptions) {
      onChangeWithOptions(value === null ? value : options.find(option => option.id === value))
    }
    rest.onChange?.(value)
  }
  return isSelectSearch ? (
    <SelectSearch
      {...getSelectProps(error)}
      {...rest}
      customSelectOptionValuekey={labelKey}
      source={source}
      {...(dependentEntities && {
        dependentField: dependentEntities,
      })}
      onSearch={debouncedOnSearch}
      onChange={onChange}
    />
  ) : (
    <Select {...getSelectProps(error)} {...rest} onChange={onChange} />
  )
}
