import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { Switch, SwitchProps } from './switch'

export default {
  title: 'Shared/Switch',
  component: Switch,
  args: {
    name: 'Storybook-switch',
    label: 'Storybook-switch',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<SwitchProps> = args => {
  const [checked, setChecked] = useState(false)

  return <Switch {...args} value={checked} onChange={setChecked} />
}

export const Default = Template.bind({})
Default.args = {}
