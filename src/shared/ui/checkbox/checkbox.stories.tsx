import { Story, Meta } from '@storybook/react'
import { Checkbox, CheckboxProps } from './checkbox'

export default {
  title: 'UI/Checkbox',
  component: Checkbox,
  args: {
    name: 'storybookCheckbox',
    label: 'Получать рассылку на e-mail',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<CheckboxProps> = args => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {}
