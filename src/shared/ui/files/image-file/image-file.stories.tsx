import Mock from 'mockjs'
import { Story, Meta } from '@storybook/react'
import { FILE_ENTITY_MOCK } from '@/app/mocks-server/constants'
import { ImageFile, ImageFileProps } from './image-file'

export default {
  title: 'Shared/ImageFile',
  component: ImageFile,
  args: {
    image: Mock.mock(FILE_ENTITY_MOCK),
  },
} as Meta

const Template: Story<ImageFileProps> = args => <ImageFile {...args} />

export const Default = Template.bind({})
Default.args = {}
