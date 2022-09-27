import { composeStories } from '@storybook/testing-react'
import { render, RenderResult } from '@testing-library/react'
import * as stories from './tooltip.stories'

const { Default } = composeStories(stories)

describe('TooltipTests', () => {
  let component = {} as RenderResult

  beforeEach(() => {
    component = render(<Default />)
  })

  it('component should be render', () => {
    expect(component.container).toBeInTheDocument()
  })
})
