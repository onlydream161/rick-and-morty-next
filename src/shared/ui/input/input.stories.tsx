import { Story, Meta } from '@storybook/react'
import { Input, InputProps } from './input'

export default {
  title: 'UI/Input',
  component: Input,
  args: {
    name: 'storyInput',
    errorMessage: 'Заполните это поле',
  },
  argTypes: {
    error: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    passwordStrength: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<InputProps> = args => <Input {...args} label='StoryInput' />

export const Default = Template.bind({})
Default.args = {}

export const Password = Template.bind({})
Password.args = {
  type: 'password',
}
