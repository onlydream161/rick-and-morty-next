import Mock from 'mockjs'
import { Story, Meta } from '@storybook/react'
import { FILE_ENTITY_MOCK } from '@/app/mocks-server/constants'
import { File, FileProps } from './file'

export default {
  title: 'Shared/File',
  component: File,
  args: {
    file: Mock.mock(FILE_ENTITY_MOCK),
  },
} as Meta

const Template: Story<FileProps> = args => <File {...args} />

export const Default = Template.bind({})
Default.args = {}
