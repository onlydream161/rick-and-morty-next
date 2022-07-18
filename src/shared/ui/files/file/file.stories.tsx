import { Story, Meta } from '@storybook/react'
import { File, FileProps } from './file'

export default {
  title: 'UI/Files/File',
  component: File,
  args: {
    file: {},
    // file: {https://dummyimage.com/200x100},
  },
} as Meta

const Template: Story<FileProps> = args => <File {...args} />

export const Default = Template.bind({})
Default.args = {}
