import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './time-input.stories'

const { Default } = composeStories(stories)

describe('TimeInput Tests', () => {
  it('TimeInput should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
