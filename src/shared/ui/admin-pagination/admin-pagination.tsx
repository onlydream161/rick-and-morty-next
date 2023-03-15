import { FC, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FCWithClassName } from '@/shared/@types'
import { Button } from '../button'
import { useTranslate } from '@/shared/lib'
import Skeleton from 'react-loading-skeleton'
import cn from 'classnames'
import ArrowIcon from '@/shared/assets/icons/common/pagination-select-arrow.svg'

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
  statsClassName?: string
  paginationClassName?: string
  onPageChange: (page: number) => void
  onPageSizeChange?: (page: number) => void
}

export const AdminPagination: FCWithClassName<AdminPaginationProps> = ({
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
  const { t } = useTranslate(['common'])

  const isPrevPageDisabled = disabled || page === 1
  const isNextPageDisabled = disabled || page === totalPageCount

  const arrowButtonStyle = 'group w-6 !rounded-small'

  return (
    <div
      className={cn('flex items-center justify-start gap-3 w-full', {
        [className]: className,
      })}
    >
      <div className='flex gap-large'>
        <h6
          data-testId='items-on-page'
          className={cn('text-text-secondary', {
            [statsClassName]: statsClassName,
          })}
        >
          {page * pageSize + 1 - pageSize}-{page === totalPageCount ? totalItems : pageSize * page} {t('of')}{' '}
          {totalItems}
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
            <h6 className='text-text-secondary'>{pageSizeTitle}</h6>
            <Menu as='div' defaultValue={pageSize} className='relative inline-block text-left'>
              {({ open }) => (
                <>
                  <Menu.Button data-testid='page-size-select' className='inline-flex items-center gap-0.5'>
                    <h6 className='text-black'>{pageSize}</h6>
                    <div className='flex items-center justify-center w-4 h-4'>
                      <ArrowIcon
                        className={cn('stroke-black transition-transform', {
                          'rotate-180': open,
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
                    <Menu.Items className='absolute p-1 origin-top -translate-x-3 bg-white border mb-extra-small drop-shadow-pagination border-border rounded-base'>
                      {pageSizeOptions?.map(size => (
                        <Menu.Item key={size}>
                          <button
                            className={cn(
                              'flex items-center justify-center w-10 h-8 rounded-base text-black hover:bg-gray-tertiary',
                              {
                                'bg-background-primary !text-gray': pageSize === size,
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
          <Button
            color='secondary'
            variant='border-icon'
            data-testid='left-button'
            className={arrowButtonStyle}
            disabled={isPrevPageDisabled}
            onClick={() => onPageChange(page - 1)}
            size='small'
          >
            <ArrowIcon className='rotate-90 stroke-currentColor ' />
          </Button>
          <h6 className='text-black'>
            {page}/<span className='text-text-secondary'>{totalPageCount}</span>
          </h6>
          <Button
            color='secondary'
            variant='border-icon'
            data-testid='right-button'
            className={arrowButtonStyle}
            disabled={isNextPageDisabled}
            onClick={() => onPageChange(page + 1)}
            size='small'
          >
            <ArrowIcon className='-rotate-90 stroke-currentColor' />
          </Button>
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
