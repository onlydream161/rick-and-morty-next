import { FC, Fragment } from 'react'
import Arrow from '@/shared/assets/icons/common/small-arrow.svg'
import cn from 'classnames'
import { Menu, Transition } from '@headlessui/react'
import Skeleton from 'react-loading-skeleton'

export interface AdminPaginationProps {
  page: number
  totalPageCount?: number
  totalItems?: number
  withPageSize?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  pageSizeTitle?: string
  selectedText?: string
  selectedCount?: number
  disabled?: boolean
  className?: string
  statsClassName?: string
  paginationClassName?: string
  onPageChange: (page: number) => void
  onPageSizeChange?: (page: number) => void
}

export const AdminPagination: FC<AdminPaginationProps> = ({
  page,
  totalPageCount = 0,
  withPageSize,
  pageSize = 0,
  pageSizeOptions,
  pageSizeTitle,
  selectedText,
  selectedCount = 0,
  totalItems = 0,
  disabled,
  className = '',
  statsClassName = '',
  paginationClassName = '',
  onPageChange,
  onPageSizeChange,
}) => {
  const isPrevPageDisabled = disabled || page === 1
  const isNextPageDisabled = disabled || page === totalPageCount

  const arrowButtonStyle = `group flex items-center justify-center bg-background-hover border border-transparent h-5 w-6 rounded-md active:border-primary
  disabled:border-lines disabled:bg-background-primary disabled:cursor-not-allowed`

  return (
    <div
      className={cn('flex items-center justify-between w-full', {
        [className]: className,
      })}
    >
      <div className='flex gap-large'>
        <h6
          className={cn('text-gray', {
            [statsClassName]: statsClassName,
          })}
        >
          {page * pageSize + 1 - pageSize}-{page === totalPageCount ? totalItems : pageSize * page} of {totalItems}
        </h6>
        {!!selectedCount && (
          <h6 className='text-gray'>
            {selectedText ? selectedText : 'Selected'}:{selectedCount}
          </h6>
        )}
      </div>
      <div
        className={cn('flex items-center gap-6', {
          [paginationClassName]: paginationClassName,
        })}
      >
        {withPageSize && (
          <div className='flex items-center gap-1'>
            <h6 className='text-gray'>{pageSizeTitle}</h6>
            <Menu as='div' defaultValue={pageSize} className='relative inline-block text-left'>
              {({ open }) => (
                <>
                  <Menu.Button data-testid='page-size-select' className='inline-flex items-center gap-[2px]'>
                    <h6 className='text-white'>{pageSize}</h6>
                    <div className='flex items-center justify-center w-4 h-4'>
                      <Arrow
                        className={cn('-rotate-90 stroke-white transition-transform', {
                          'rotate-90': open,
                        })}
                      />
                    </div>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute mb-[6px] -translate-x-3 -translate-y-72 border border-gray p-1 rounded-md bg-background-hover outline-none origin-top'>
                      {pageSizeOptions?.map(size => (
                        <Menu.Item key={size}>
                          <button
                            className={cn(
                              'flex items-center justify-center w-10 h-8 rounded-md text-white hover:text-primary',
                              {
                                'bg-background-primary !text-primary': pageSize === size,
                              }
                            )}
                            onClick={() => {
                              onPageSizeChange?.(size)
                              onPageChange(1)
                            }}
                          >
                            <h6>{size}</h6>
                          </button>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        )}
        <div className='flex items-center gap-base'>
          <button
            data-testid='left-button'
            className={arrowButtonStyle}
            disabled={isPrevPageDisabled}
            onClick={() => onPageChange(page - 1)}
          >
            <Arrow
              className={cn('stroke-white group-hover:stroke-primary', {
                '!stroke-lines': isPrevPageDisabled,
              })}
            />
          </button>
          <h6 className='text-gray'>
            {page}/<span className='text-white'>{totalPageCount}</span>
          </h6>
          <button
            data-testid='right-button'
            className={arrowButtonStyle}
            disabled={isNextPageDisabled}
            onClick={() => onPageChange(page + 1)}
          >
            <Arrow
              className={cn('rotate-180 stroke-white group-hover:stroke-primary', {
                '!stroke-stlinesroke': isNextPageDisabled,
              })}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export interface AdminPaginationSkeletonProps {
  className?: string
  paginationClassName?: string
}

export const AdminPaginationSkeleton: FC<AdminPaginationSkeletonProps> = ({
  className = '',
  paginationClassName = '',
}) => {
  return (
    <div
      className={cn('flex items-center justify-between w-full', {
        [className]: className,
      })}
    >
      <Skeleton className='!w-[90px] h-5' />
      <div
        className={cn('flex items-center gap-6', {
          [paginationClassName]: paginationClassName,
        })}
      >
        <div className='flex items-center gap-1'>
          <Skeleton className='!w-[90px] h-5' />
          <Skeleton className='!w-[30px] h-5' />
        </div>
        <div className='flex items-center gap-base'>
          <Skeleton className='!w-6 h-5' />
          <Skeleton className='!w-6 h-5' />
          <Skeleton className='!w-6 h-5' />
        </div>
      </div>
    </div>
  )
}
