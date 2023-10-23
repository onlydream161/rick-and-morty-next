import { Story, Meta } from '@storybook/react'
import { NumericInput, NumericInputProps } from './numeric-input'

export default {
  title: 'Shared/NumericInput',
  component: NumericInput,
} as Meta

const Template: Story<NumericInputProps> = args => <NumericInput {...args} />

export const Default = Template.bind({})
Default.args = {}
