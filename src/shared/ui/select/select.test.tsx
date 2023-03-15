import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './select.stories'

const { Default } = composeStories(stories)

describe('Select Tests', () => {
  it('Select should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
