import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { Nullable, Sort } from '@/shared/@types'
import { Sorting, SortingProps } from './sorting'

const Template: Story<SortingProps> = args => {
  const [value, onChange] = useState<Nullable<Sort>>('desc')

  return <Sorting {...args} value={value} onChange={onChange} />
}

export const Default = Template.bind({})
Default.args = {}

export default {
  title: 'Shared/Sorting',
  component: Sorting,
  args: {
    label: 'SOURCE',
  },
} as Meta
