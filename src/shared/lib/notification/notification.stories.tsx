import { Story, Meta } from '@storybook/react'
import { Notification, NotificationProps } from './notification'

export default {
  title: 'Shared/Notification',
  component: Notification,
  args: {
    t: (str: string) => str,
  },
} as Meta

const Template: Story<NotificationProps> = args => <Notification {...args} />

export const Default = Template.bind({})
Default.args = {
  status: 'success',
}
