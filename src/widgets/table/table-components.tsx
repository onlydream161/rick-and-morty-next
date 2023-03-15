import Skeleton from 'react-loading-skeleton'
import cn from 'classnames'
import { PropsTable } from '@/widgets/table/table'

export const getTableComponents = (isLoading: boolean | undefined) => {
  return {
    body: {
      row: (props: PropsTable) => <tr {...props}>{props.children}</tr>,
      cell: (props: PropsTable) => (
        <td {...props} className={cn('py-6 px-10 text-text-secondary text-center', props.className)}>
          {isLoading ? <Skeleton /> : props.children}
        </td>
      ),
    },
    table: (props: PropsTable) => (
      <table {...props} className={cn('w-full border-separate border-spacing-0', props.className)}></table>
    ),
    header: {
      row: (props: PropsTable) => (
        <tr {...props} className={cn('bg-background-secondary border-b border-border', props.className)}>
          {props.children}
        </tr>
      ),
      cell: (props: PropsTable) => (
        <th
          {...props}
          className={cn('pb-6 px-10 whitespace-nowrap font-medium text-black border-b border-border', props.className)}
        >
          <h3 className='text-text'>{props.children}</h3>
        </th>
      ),
    },
  }
}
