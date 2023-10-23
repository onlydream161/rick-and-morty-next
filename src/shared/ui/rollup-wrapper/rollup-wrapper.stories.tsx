import { Story, Meta } from '@storybook/react'
import { RollupWrapper, RollupWrapperProps } from './rollup-wrapper'

export default {
  title: 'Shared/RollupWrapper',
  component: RollupWrapper,
} as Meta

const Template: Story<RollupWrapperProps> = args => <RollupWrapper {...args} />

export const Default = Template.bind({})
Default.args = {}
