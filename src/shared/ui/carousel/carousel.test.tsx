import { render } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './carousel.stories'

const { Default } = composeStories(stories)

describe('CarouselTests', () => {
  it('Carousel should be render', () => {
    const { container } = render(<Default />)
    expect(container).toBeInTheDocument()
  })
})
