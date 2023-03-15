import { SELECT_OPTION_MOCK } from '@/shared/config'
import { Story, Meta } from '@storybook/react'
import { mock } from 'mockjs'
import { useState } from 'react'
import { RadioGroup, RadioGroupProps } from './radio-group'

export default {
  title: 'Shared/RadioGroup',
  component: RadioGroup,
  args: mock({ 'options|5': [SELECT_OPTION_MOCK] }),
  argTypes: {
    options: {
      table: {
        disable: true,
      },
    },
  },
} as Meta

const Template: Story<RadioGroupProps<number>> = args => {
  const [value, setValue] = useState(1)

  return (
    // @ts-expect-error
    <RadioGroup value={value} onChange={setValue} {...args} />
  )
}

export const Default = Template.bind({})
Default.args = {}
