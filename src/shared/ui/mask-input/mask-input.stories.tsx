import { Story, Meta } from '@storybook/react'
import { MaskInput, MaskInputProps } from './mask-input'
import { useRef, useState } from 'react'

export default {
  title: 'Shared/MaskInput',
  component: MaskInput,
  argTypes: {
    format: {
      control: 'text',
      defaultValue: '##/##',
    },
  },
} as Meta

const Template: Story<MaskInputProps> = args => {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  return <MaskInput {...args} ref={ref} value={value} onChange={e => setValue(e.target.value)} />
}

export const Default = Template.bind({})
Default.args = {}
