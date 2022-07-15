import { Story, Meta } from '@storybook/react'
import { Tab, TabProps } from '.'

export default {
  title: 'Shared/TabPanel',
  component: Tab,
} as Meta

const Template: Story<TabProps> = args => <Tab {...args}>Управление подпиской</Tab>

export const Default = Template.bind({})
Default.args = {}
