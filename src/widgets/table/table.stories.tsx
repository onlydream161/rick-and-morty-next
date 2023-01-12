import { Story, Meta } from '@storybook/react'
import { Table, TableProps } from './table'

export default {
  title: 'Widgets/Table',
  component: Table,
} as Meta

const Template: Story<TableProps> = args => <Table {...args} />

export const Default = Template.bind({})
Default.args = {}
