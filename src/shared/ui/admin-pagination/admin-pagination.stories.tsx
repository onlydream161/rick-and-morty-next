import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { AdminPagination, AdminPaginationProps } from './admin-pagination'

export default {
  title: 'Shared/AdminPagination',
  component: AdminPagination,
  args: {
    pageSizeTitle: 'Rows per page:',
    pageSizeOptions: [5, 10, 15, 20, 30, 40, 50],
  },
} as Meta

const Template: Story<AdminPaginationProps> = args => {
  const [page, onPageChange] = useState(1)
  const [pageSize, onPageSizeChange] = useState(5)

  return (
    <AdminPagination
      {...args}
      page={page}
      pageSize={pageSize}
      totalPageCount={32}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const withPageSize = Template.bind({})
withPageSize.args = {
  withPageSize: true,
}
