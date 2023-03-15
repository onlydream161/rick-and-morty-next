import { Story, Meta } from '@storybook/react'
import { mock } from 'mockjs'
import { OptionalLinkWrapper, OptionalLinkWrapperProps } from './optional-link-wrapper'

export default {
  title: 'Shared/Optional Link Wrapper',
  component: OptionalLinkWrapper,
  args: mock({ href: '@guid' }),
} as Meta

const Template: Story<OptionalLinkWrapperProps> = args => (
  <OptionalLinkWrapper {...args}>
    <h3>Ссылка</h3>
  </OptionalLinkWrapper>
)

export const Default = Template.bind({})
Default.args = {}
