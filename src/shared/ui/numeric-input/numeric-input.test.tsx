import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './numeric-input.stories'

const { Default } = composeStories(stories)

describe('NumericInput Tests', () => {
  it('NumericInput should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
