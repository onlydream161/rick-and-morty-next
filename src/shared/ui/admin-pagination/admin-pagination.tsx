import { FC, Fragment } from 'react'
import Arrow from '@/shared/assets/icons/common/small-arrow.svg'
import cn from 'classnames'
import { Menu, Transition } from '@headlessui/react'

export interface AdminPaginationProps {
  page: number
  totalPageCount: number
  withPageSize?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  pageSizeTitle?: string
  disabled?: boolean
  className?: string
  onPageChange: (page: number) => void
  onPageSizeChange?: (page: number) => void
}

export const AdminPagination: FC<AdminPaginationProps> = ({
  page,
  totalPageCount,
  withPageSize,
  pageSize,
  pageSizeOptions,
  pageSizeTitle,
  disabled,
  className = '',
  onPageChange,
  onPageSizeChange,
}) => {
  const isPrevPageDisabled = disabled || page === 1
  const isNextPageDisabled = disabled || page === totalPageCount

  const arrowButtonStyle = `group flex items-center justify-center bg-background-hover border border-transparent h-5 w-6 rounded-md active:border-primary
  disabled:border-lines disabled:bg-background-primary disabled:cursor-not-allowed`

  return (
    <div
      className={cn('flex items-center gap-6', {
        [className]: className,
      })}
    >
      {withPageSize && (
        <div className='flex items-center gap-1'>
          <p className='text-gray text-smalltext'>{pageSizeTitle}</p>
          <Menu as='div' defaultValue={pageSize} className='relative inline-block text-left'>
            {({ open }) => (
              <>
                <Menu.Button className='inline-flex items-center gap-[2px]'>
                  <p className='text-white text-smalltext'>{pageSize}</p>
                  <div className='flex items-center justify-center w-4 h-4'>
                    <Arrow
                      className={cn('-rotate-90 stroke-black transition-transform', {
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
                  <Menu.Items className='absolute mt-[6px] -translate-x-4 border border-gray p-1 rounded-md bg-background-hover outline-none origin-top'>
                    {pageSizeOptions?.map(size => (
                      <Menu.Item key={size}>
                        <button
                          className={cn(
                            'flex items-center justify-center w-10 h-8 rounded-md hover:bg-background-primary text-white hover:text-primary',
                            {
                              '!text-primary': pageSize === size,
                            }
                          )}
                          onClick={() => onPageSizeChange?.(size)}
                        >
                          <h4>{size}</h4>
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
        <button className={arrowButtonStyle} disabled={isPrevPageDisabled} onClick={() => onPageChange(page - 1)}>
          <Arrow
            className={cn('stroke-white group-hover:stroke-primary', {
              '!stroke-stroke': isPrevPageDisabled,
            })}
          />
        </button>
        <p className='text-white text-smalltext'>
          <span className='text-gray'>{page}</span>/{totalPageCount}
        </p>
        <button className={arrowButtonStyle} disabled={isNextPageDisabled} onClick={() => onPageChange(page + 1)}>
          <Arrow
            className={cn('rotate-180 stroke-white group-hover:stroke-primary', {
              '!stroke-stroke': isNextPageDisabled,
            })}
          />
        </button>
      </div>
    </div>
  )
}
