import { FC } from 'react'
import SortArrow from '@/shared/assets/icons/common/sort-arrow.svg'
import DefaultSort from '@/shared/assets/icons/common/default-sort.svg'
import { Nullable, Sort } from '@/shared/@types'
import { SORT_ASC, SORT_DESC } from '@/shared/config'
import { getNormalizedSortString } from '@/shared/helpers'

export interface TableSortProps {
  value: Nullable<string>
  onChange: (value: Nullable<string>) => void
  title: string
  field: string
}
export const TableSort: FC<TableSortProps> = ({ value, onChange, title, field }) => {
  const sort = value?.replace(new RegExp(`{"order\\[${field}\\]":"(\\w+)"}`), '$1') as Sort

  const handleSort = () => {
    onChange?.(
      sort === SORT_ASC
        ? getNormalizedSortString(field, SORT_DESC)
        : sort === SORT_DESC
        ? null
        : getNormalizedSortString(field, SORT_ASC)
    )
  }

  return (
    <div className='flex items-center gap-x-2.5 cursor-pointer' onClick={handleSort}>
      <h3 className='text-text'>{title}</h3>
      {sort !== SORT_ASC && sort !== SORT_DESC && <DefaultSort className='stroke-currentColor' />}
      {sort === SORT_DESC && <SortArrow className='transform rotate-180 stroke-currentColor' />}
      {sort === SORT_ASC && <SortArrow className='stroke-currentColor' />}
    </div>
  )
}
