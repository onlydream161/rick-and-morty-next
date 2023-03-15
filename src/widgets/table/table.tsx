import { FC, ReactElement } from 'react'
import { TableProps as RCTableProps } from 'rc-table/lib/Table'
import { AdminPagination, AdminPaginationProps, AdminPaginationSkeleton, EmptyContent } from '@/shared/ui'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { useTranslate } from '@/shared/lib'
import { DEFAULT_PAGE_SIZE_OPTIONS } from '@/shared/config'
import { PropsWithClassName } from '@/shared/@types'
import { TableTitle } from '@/widgets/table/table-title'
import { getTableComponents } from '@/widgets/table/table-components'
import Skeleton from 'react-loading-skeleton'
import dynamic from 'next/dynamic'
import cn from 'classnames'

export type PropsTable<T = unknown> = PropsWithClassName<T> & { children: ReactElement }
const RCTable = dynamic(() => import('rc-table'), { ssr: false })

export interface TableProps<T = Partial<DefaultRecordType>> extends RCTableProps<T>, AdminPaginationProps {
  isLoading?: boolean
  tableTitle?: string
  onAdd?: () => void
}

export const Table: FC<TableProps> = ({ data, className = '', tableTitle, onAdd, children, isLoading, ...rest }) => {
  const { t } = useTranslate(['common'])
  return (
    <div className='flex flex-col w-full gap-y-5'>
      <div className='border bg-background-secondary border-border rounded-base'>
        <RCTable
          emptyText={isLoading ? <Skeleton /> : <EmptyContent />}
          rowKey='id'
          className={cn('mb-5 w-full h-fit border-separate rounded-base', {
            [className]: className,
          })}
          title={() => <TableTitle onClick={onAdd} title={tableTitle} />}
          data={data}
          rowClassName='odd:bg-white hover:bg-background-quaternary active:bg-main-hover even:bg-background-secondary'
          components={getTableComponents(isLoading)}
          {...rest}
        >
          {children}
        </RCTable>
      </div>
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
