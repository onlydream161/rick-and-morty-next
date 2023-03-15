import { composeStories } from '@storybook/testing-react'
import { render } from '@/jest/utils'
import * as stories from './truncate-container.stories'

const { Default } = composeStories(stories)

describe('TrancateContainerTests', () => {
  it('TrancateContainer should be render', () => {
    render(<Default />)
  })
})
