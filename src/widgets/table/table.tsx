import { FC } from 'react'
import dynamic from 'next/dynamic'
import cn from 'classnames'
import { TableProps as RCTableProps } from 'rc-table/lib/Table'
import { AdminPagination, AdminPaginationProps, AdminPaginationSkeleton, EmptyContent } from '@/shared/ui'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { useTranslate } from '@/shared/lib'
import { DEFAULT_PAGE_SIZE_OPTIONS } from '@/shared/config'
import Skeleton from 'react-loading-skeleton'

const RCTable = dynamic(() => import('rc-table'), { ssr: false })

export interface TableProps<T = Partial<DefaultRecordType>> extends RCTableProps<T>, AdminPaginationProps {
  isLoading?: boolean
}

export const Table: FC<TableProps> = ({ data, className = '', children, isLoading, ...rest }) => {
  const { t } = useTranslate(['common'])
  return (
    <div className='flex flex-col w-full'>
      <RCTable
        emptyText={isLoading ? <Skeleton /> : <EmptyContent />}
        rowKey='id'
        className={cn('mb-5 bg-background-secondary w-full h-fit rounded-xl p-large', className)}
        data={data}
        {...rest}
      >
        {children}
      </RCTable>
      {isLoading ? (
        <AdminPaginationSkeleton className='px-table' />
      ) : (
        !!rest.totalPageCount && (
          <AdminPagination
            selectedText={t('selected')}
            withPageSize
            className='px-large'
            pageSizeTitle={t('RowsPerPage')}
            pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
            {...rest}
          />
        )
      )}
    </div>
  )
}
