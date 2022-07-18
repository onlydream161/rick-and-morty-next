import { Story, Meta } from '@storybook/react'
import { ImageFile, ImageFileProps } from './image-file'

export default {
  title: 'UI/Files/ImageFile',
  component: ImageFile,
  args: {
    image: {
      url: 'test',
    },
    // image: DEFAULT_PICTURE,
  },
} as Meta

const Template: Story<ImageFileProps> = args => <ImageFile {...args} />

export const Default = Template.bind({})
Default.args = {}
