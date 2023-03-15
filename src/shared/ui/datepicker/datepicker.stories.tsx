import { Nullable } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { Datepicker, DatepickerProps } from './datepicker'

export default {
  title: 'Shared/Datepicker',
  component: Datepicker,
  args: {
    name: 'storybook-datepicker',
    inputProps: {
      label: 'Date',
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    isSaved: {
      control: 'boolean',
      defaultValue: false,
    },
    inputProps: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex justify-center p-12'>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: Story<DatepickerProps> = args => {
  const [date, setDate] = useState<Nullable<string>>()

  return <Datepicker value={date} onChange={setDate} className='w-80' {...args} />
}

export const Default = Template.bind({})
Default.args = {}

export const WithError = Template.bind({})
WithError.args = {
  inputProps: {
    label: 'Date',
    error: { type: 'required', message: 'Invalid date' },
  },
}
