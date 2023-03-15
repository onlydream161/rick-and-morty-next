import { Story, Meta } from '@storybook/react'
import { Notification, NotificationProps } from './notification'

export default {
  title: 'Shared/Notification',
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'error', 'info'],
    },
  },
  component: Notification,
} as Meta

const Template: Story<NotificationProps> = args => <Notification {...args} />

export const Default = Template.bind({})
Default.args = {
  status: 'success',
  payload: 'test test test test test test test test test test test test',
}
