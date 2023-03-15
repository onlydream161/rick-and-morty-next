import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './radio-group.stories'

const { Default } = composeStories(stories)

describe('RadioGroup Tests', () => {
  it('RadioGroup should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })
})
