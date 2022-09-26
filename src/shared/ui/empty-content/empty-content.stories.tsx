import { Story, Meta } from '@storybook/react'
import { EmptyContent, EmptyContentProps } from './empty-content'

export default {
  title: 'src/entities/nodata/nodata',
  component: EmptyContent,
} as Meta

const Template: Story<EmptyContentProps> = args => <EmptyContent {...args} />

export const Default = Template.bind({})
Default.args = {}
