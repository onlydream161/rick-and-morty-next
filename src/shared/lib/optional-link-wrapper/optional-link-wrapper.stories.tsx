import { Story, Meta } from '@storybook/react'
import { OptionalLinkWrapper, OptionalLinkWrapperProps } from './optional-link-wrapper'

export default {
  title: 'Shared/OptionalLinkWrapper',
  component: OptionalLinkWrapper,
} as Meta

const Template: Story<OptionalLinkWrapperProps> = args => <OptionalLinkWrapper {...args} />

export const Default = Template.bind({})
Default.args = {}
