import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { Tab, TabProps } from '.'

export default {
  title: 'Shared/TabPanel',
  component: Tab,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'transparent'],
    },
    error: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<TabProps> = ({ children, ...rest }) => {
  const [active, setActive] = useState(false)

  return (
    <Tab active={active} onClick={() => setActive(prev => !prev)} {...rest}>
      <h2>Tab</h2>
    </Tab>
  )
}

export const Default = Template.bind({})
export const WithClose = Template.bind({})

Default.args = {}
WithClose.args = {
  onRemove: () => console.warn('remove'),
}
