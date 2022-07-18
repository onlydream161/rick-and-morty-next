import { render, RenderResult } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './files-view.stories'

const { Default } = composeStories(stories)

describe('FilesTests', () => {
  let component = {} as RenderResult

  beforeAll(() => {
    component = render(<Default />)
  })

  it('component should be render', () => {
    expect(component.container).toBeInTheDocument()
  })
})
