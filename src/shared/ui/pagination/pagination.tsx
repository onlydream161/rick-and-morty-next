import { Dispatch, FC, SetStateAction } from 'react'
import Arrow from '@/shared/assets/icons/common/arrow.svg'
import Dots from '@/shared/assets/icons/common/dots.svg'
import cn from 'classnames'

export interface PaginationProps {
  currentPage: number
  onChange: Dispatch<SetStateAction<number>>
  totalPageCount: number
  siblingCount?: number
  className?: string
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  onChange,
  totalPageCount,
  siblingCount = 2,
  className,
}) => {
  const leftSiblingOffset = currentPage - 1 - siblingCount
  const rightSiblingOffset = totalPageCount - (currentPage + siblingCount)

  const leftSiblingCount = rightSiblingOffset > 0 ? siblingCount : siblingCount - rightSiblingOffset
  const rightSiblingCount = leftSiblingOffset > 0 ? siblingCount : siblingCount - leftSiblingOffset

  const shouldShowLeftDots = currentPage - siblingCount - 1 > 1 && currentPage - 1 - leftSiblingCount !== 1
  const shouldShowRightDots =
    currentPage + siblingCount + 1 < totalPageCount && currentPage + 1 + rightSiblingCount !== totalPageCount

  const pageDash = siblingCount * 2 + 1

  const renderButton = (page: number) => (
    <button key={page} className={cn('group pagination-button')} onClick={() => onChange(page)}>
      <p
        className={cn('text-base font-bold text-white group-active:text-main', {
          ['!text-main']: currentPage === page,
        })}
      >
        {page}
      </p>
    </button>
  )

  const renderDotsButton = (type: 'prev' | 'next') => (
    <button
      className='group pagination-button'
      onClick={() =>
        onChange(prev => {
          if (type === 'prev') {
            return prev - pageDash > 0 ? prev - pageDash : 1
          }
          return pageDash + currentPage < totalPageCount ? prev + pageDash : totalPageCount
        })
      }
    >
      <Dots className='fill-white w-[12px] h-[4px] group-active:fill-main' />
    </button>
  )

  const renderArrowButton = (type: 'prev' | 'next') => (
    <button
      className='border border-transparent group pagination-arrow bg-background-secondary active:border active:border-main disabled:border-background-primary disabled:bg-transparent'
      onClick={() => onChange(prev => (type === 'prev' ? --prev : ++prev))}
      disabled={(type === 'prev' && currentPage === 1) || (type === 'next' && currentPage >= totalPageCount)}
    >
      <Arrow
        className={`fill-white w-[7px] h-[13px] group-hover:fill-main group-disabled:fill-background-primary ${
          type === 'next' && 'rotate-180'
        }`}
      />
    </button>
  )

  return (
    <div className={`flex items-center justify-center flex-wrap gap-5 ${className}`}>
      {renderArrowButton('prev')}
      {renderButton(1)}
      {shouldShowLeftDots && renderDotsButton('prev')}
      {Array.from({ length: totalPageCount }, (_, i) => ++i)
        .filter(
          el =>
            el <= currentPage + rightSiblingCount &&
            el >= currentPage - leftSiblingCount &&
            el !== 1 &&
            el !== totalPageCount
        )
        .map(page => renderButton(page))}
      {shouldShowRightDots && renderDotsButton('next')}
      {totalPageCount > 1 && renderButton(totalPageCount)}
      {renderArrowButton('next')}
    </div>
  )
}
