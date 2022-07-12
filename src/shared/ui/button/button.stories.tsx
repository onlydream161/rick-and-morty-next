import { Story, Meta } from '@storybook/react'
import { Button, ButtonProps } from './button'

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'inverse', 'inverse-outlined'],
      defaultValue: 'primary',
    },
    scale: {
      control: 'select',
      options: ['default', 'large'],
      defaultValue: 'default',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args}>Кнопка</Button>

export const Default = Template.bind({})
Default.args = {}
