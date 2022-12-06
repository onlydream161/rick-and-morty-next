import { Story, Meta } from '@storybook/react'
import { mock, Random } from 'mockjs'
import { Carousel, CarouselProps } from './carousel'

export default {
  title: 'Shared/Carousel',
  component: Carousel,
  args: mock({
    'images|15': [
      {
        'id|+1': 1,
        url: Random.image(),
      },
    ],
    slideWidth: 266,
    slideHeight: 200,
  }),
} as Meta

const Template: Story<CarouselProps> = args => <Carousel {...args} />

export const Default = Template.bind({})
Default.args = {}
