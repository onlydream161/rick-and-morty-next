import Mock from 'mockjs'
import { Story, Meta } from '@storybook/react'
import { FILE_ENTITY_MOCK } from '@/app/mocks-server/constants'
import { FilesView, FilesViewProps } from './files-view'

export default {
  title: 'Shared/FilesView',
  component: FilesView,
  args: Mock.mock({
    'files|5-10': [FILE_ENTITY_MOCK],
  }),
} as Meta

const Template: Story<FilesViewProps> = args => <FilesView {...args} />

export const Default = Template.bind({})
Default.args = {}
