import { Story, Meta } from '@storybook/react'
import { FilesView, FilesViewProps } from './files-view'

export default {
  title: 'UI/Files/FilesView',
  component: FilesView,
  args: {
    // files: [...Array.from({ length: 4 }, () => DEFAULT_PICTURE), ...Array.from({ length: 4 }, () => DEFAULT_FILE)],
  },
} as Meta

const Template: Story<FilesViewProps> = args => <FilesView {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Preview = Template.bind({})
Preview.args = {
  isPreview: true,
}
