import { Nullable } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { Select, SelectProps } from './select'

export default {
  title: 'Shared/Select',
  component: Select,
  args: {
    options: [
      { id: 1, label: 'Durward Reynolds' },
      { id: 2, label: 'Kenton Towne' },
      { id: 3, label: 'Therese Wunsch' },
      { id: 4, label: 'Benedict Kessler' },
      { id: 5, label: 'Katelyn Rohan' },
    ],
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    isLoading: {
      control: 'boolean',
      defaultValue: false,
    },
    isSaved: {
      control: 'boolean',
      defaultValue: false,
    },
    options: {
      table: {
        disable: true,
      },
    },
  },
} as Meta

const Template: Story<SelectProps<number>> = args => {
  const [value, onChange] = useState<Nullable<number>>(null)

  return <Select className='max-w-sm' {...args} value={value} onChange={onChange} label='StorySelect' />
}

export const Default = Template.bind({})
Default.args = {}

export const Empty = Template.bind({})
Empty.args = {
  options: [],
}

export const WithError = Template.bind({})
WithError.args = {
  inputProps: {
    error: { type: 'required', message: 'StorySelectSearchError' },
  },
}
