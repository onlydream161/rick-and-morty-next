import { Story, Meta } from '@storybook/react'
import { ChangeThemeButton } from './change-theme-button'

export default {
  title: 'Features/Change Theme Button',
  component: ChangeThemeButton,
} as Meta

const Template: Story = args => <ChangeThemeButton {...args} />

export const Default = Template.bind({})
Default.args = {}
