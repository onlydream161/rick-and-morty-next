import { Story, Meta } from '@storybook/react'
import { TrancateContainer, TrancateContainerProps } from './truncate-container'

export default {
  title: 'Shared/TrancateContainer',
  component: TrancateContainer,
  args: {
    maxWidth: 190,
  },
} as Meta

const Template: Story<TrancateContainerProps> = args => <TrancateContainer {...args}>Info Text</TrancateContainer>

export const Default = Template.bind({})
Default.args = {}
