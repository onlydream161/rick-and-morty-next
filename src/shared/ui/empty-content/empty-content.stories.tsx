import { Story, Meta } from '@storybook/react'
import { EmptyContent, EmptyContentProps } from './empty-content'

export default {
  title: 'Shared/Empty Content',
  component: EmptyContent,
} as Meta

const Template: Story<EmptyContentProps> = args => <EmptyContent {...args} />

export const Default = Template.bind({})
Default.args = {}
