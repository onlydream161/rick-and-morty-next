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
    t: (str: string) => str,
  },
} as Meta

const Template: Story<SelectProps<number>> = args => {
  const [value, onChange] = useState<number | undefined>(1)

  return <Select {...args} value={value} onChange={onChange} />
}

export const Default = Template.bind({})
Default.args = {}

export const WithSearch = Template.bind({})
WithSearch.args = {
  showSearch: true,
}

export const OnlySearch = Template.bind({})
OnlySearch.args = {
  showSearch: true,
  onlySearch: true,
}
