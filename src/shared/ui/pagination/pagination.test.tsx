import { render, RenderResult } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './pagination.stories'

const { Default } = composeStories(stories)

describe('PaginationTests', () => {
  let component = {} as RenderResult

  beforeAll(() => {
    component = render(<Default />)
  })

  it('component should be render', () => {
    expect(component.container).toBeInTheDocument()
  })
})
