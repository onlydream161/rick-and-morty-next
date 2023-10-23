import { Story, Meta } from '@storybook/react'
import { TimeInput, TimeInputProps } from './time-input'
import { Form } from '@/shared/lib'

export default {
  title: 'Shared/TimeInput',
  component: TimeInput,
  args: {
    isReadMode: false,
    minutesFieldName: 'minutes',
    secondsFieldName: 'seconds',
    label: 'label',
  },
} as Meta

const Template: Story<TimeInputProps> = args => (
  <Form onSubmit={console.warn}>
    <TimeInput {...args} />
  </Form>
)

export const Default = Template.bind({})
Default.args = {}
