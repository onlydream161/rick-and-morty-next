import { Story, Meta } from '@storybook/react'
import { RangeDatepicker, DatepickerProps } from './range-datepicker'

export default {
  title: 'Shared/Range Datepicker',
  component: RangeDatepicker,
  args: {
    name: 'storybook-range-datepicker',
    label: 'START TIME',
    t: (str: string) => str,
  },
} as Meta

const Template: Story<DatepickerProps> = args => <RangeDatepicker {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const WithError = Template.bind({})
WithError.args = {
  error: true,
  errorMessage: 'Invalid date',
}
