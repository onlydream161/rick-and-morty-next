import { Nullable } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { SelectSearch, SelectSearchProps } from './select-search'

export default {
  title: 'Shared/Select Search',
  component: SelectSearch,
  args: {
    name: 'SelectSearchStory',
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
    withOptionAddition: {
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

const Template: Story<SelectSearchProps<Nullable<number>>> = args => {
  const [value, onChange] = useState<Nullable<number>>()

  return <SelectSearch className='max-w-sm' value={value} onChange={onChange} {...args} label='StorySelectSearch' />
}

export const Default = Template.bind({})
Default.args = {}

export const Empty = Template.bind({})
Empty.args = {
  options: undefined,
}

export const WithError = Template.bind({})
WithError.args = {
  inputProps: {
    error: { type: 'required', message: 'StorySelectSearchError' },
  },
}
