import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { AdminPagination, AdminPaginationProps } from './admin-pagination'

export default {
  title: 'Shared/Admin Pagination',
  component: AdminPagination,
  argTypes: {
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
  },
  args: {
    pageSizeTitle: 'Строк на странице:',
    pageSizeOptions: [5, 10, 15, 20, 30, 40, 50],
    totalItems: 150,
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
      totalPageCount={2}
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

export const WithPageSize = Template.bind({})
WithPageSize.args = {
  withPageSize: true,
}
