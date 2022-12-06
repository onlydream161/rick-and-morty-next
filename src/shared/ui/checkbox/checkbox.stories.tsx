import { Story, Meta } from '@storybook/react'
import { Checkbox, CheckboxProps } from './checkbox'

export default {
  title: 'Shared/Checkbox',
  component: Checkbox,
  args: {
    name: 'storybookCheckbox',
    label: 'Получать рассылку на e-mail',
    errorMessage: 'Error text',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    error: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<CheckboxProps> = args => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {}
