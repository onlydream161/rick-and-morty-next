import { FC } from 'react'
import Arrow from '@/shared/assets/icons/common/filled-arrow.svg'
import { Nullable, Sort } from '@/shared/@types'
import { SORT_ASC, SORT_DESC } from '@/shared/config'
import cn from 'classnames'

export interface SortingProps {
  label?: string
  value?: Nullable<Sort>
  onChange: (value: Nullable<Sort>) => void
}

export const Sorting: FC<SortingProps> = ({ label, value, onChange }) => {
  return (
    <div className='flex items-center gap-[5px]'>
      <h5 className='text-white'>{label}</h5>
      <div
        onClick={() => onChange(value === SORT_DESC ? SORT_ASC : value === SORT_ASC ? null : SORT_DESC)}
        className=' group flex flex-col items-center justify-center gap-[2px] w-4 h-4'
      >
        <Arrow
          data-testid='arrow_two'
          className={cn('fill-gray group-hover:!fill-lines cursor-pointer rotate-180', {
            '!fill-primary': value === 'asc',
          })}
        />
        <Arrow
          data-testid='arrow_one'
          className={cn('fill-gray group-hover:!fill-lines cursor-pointer', {
            '!fill-primary': value === 'desc',
          })}
        />
      </div>
    </div>
  )
}
