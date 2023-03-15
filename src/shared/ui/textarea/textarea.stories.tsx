import { Story, Meta } from '@storybook/react'
import { Textarea, TextareaProps } from './textarea'

export default {
  title: 'Shared/Textarea',
  component: Textarea,
  args: {
    name: 'StoryTextarea',
    label: 'StoryTextarea',
    errorMessage: 'Заполните это поле',
  },
  argTypes: {
    resizable: {
      control: 'boolean',
      defaultValue: false,
    },
    autosize: {
      control: 'boolean',
      defaultValue: false,
    },
    error: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<TextareaProps> = args => <Textarea {...args} />

export const Default = Template.bind({})
Default.args = {}
