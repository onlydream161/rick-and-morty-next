import { Story, Meta } from '@storybook/react'
import { NextImage, NextImageProps } from './next-image'
import { Random } from 'mockjs'

export default {
  title: 'Shared/Next Image',
  component: NextImage,
  argTypes: {
    width: { control: { type: 'number' }, defaultValue: undefined },
    height: { control: { type: 'number' }, defaultValue: undefined },
  },
} as Meta

const Template: Story<NextImageProps> = args => <NextImage {...args} />

export const Default = Template.bind({})
Default.args = {
  src: Random.image('600x200'),
}

export const NoImage = Template.bind({})
NoImage.args = {
  width: 600,
  height: 600,
}
