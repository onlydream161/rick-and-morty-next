import { mock } from 'mockjs'
import { Story, Meta } from '@storybook/react'
import { File, FileProps } from './file'
import { FILE_ENTITY_MOCK, IMAGE_ENTITY_MOCK } from '@/shared/config'

export default {
  title: 'Shared/File',
  component: File,
} as Meta

const Template: Story<FileProps> = args => <File {...args} />

export const Default = Template.bind({})
Default.args = {
  file: mock(FILE_ENTITY_MOCK),
}

export const Image = Template.bind({})
Image.args = {
  file: mock(IMAGE_ENTITY_MOCK),
}
