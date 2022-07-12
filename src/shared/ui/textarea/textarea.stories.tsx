import { Story, Meta } from '@storybook/react'
import { useRef } from 'react'
import { Textarea, TextareaProps } from './textarea'

export default {
  title: 'UI/Textarea',
  component: Textarea,
  args: {
    name: 'StoryTextarea',
    label: 'StoryTextarea',
    errorMessage: 'Заполните это поле',
  },
  argTypes: {
    error: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<TextareaProps> = args => {
  const ref = useRef<HTMLTextAreaElement>(null)

  return <Textarea ref={ref} {...args} />
}

export const Default = Template.bind({})
Default.args = {}

export const WithFile = Template.bind({})
WithFile.args = {
  uploadProps: true,
}
