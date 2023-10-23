import { render, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './form-block-wrapper.stories'

const { Default } = composeStories(stories)

describe('FormBlockWrapper Tests', () => {
  it('FormBlockWrapper should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })

  it('FormBlockWrapper should be render with title', () => {
    render(<Default title={'Тестовый заголовок'} />)
    expect(screen.findByText('Тестовый заголовок')).toBeTruthy()
  })
})
