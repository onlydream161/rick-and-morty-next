import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './rollup-wrapper.stories'

const { Default } = composeStories(stories)

describe('RollupWrapper Tests', () => {
  it('RollupWrapper should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
