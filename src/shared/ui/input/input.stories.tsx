import { Story, Meta } from '@storybook/react'
import { Input, InputProps } from './input'

export default {
  title: 'Shared/Input',
  component: Input,
  args: {
    name: 'storyInput',
    errorMessage: 'Заполните это поле',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'search', 'password'],
      defaultValue: 'text',
    },
    error: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    isSaved: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<InputProps> = args => <Input {...args} label='StoryInput' />

export const Default = Template.bind({})
Default.args = {}
