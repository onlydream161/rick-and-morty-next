import { act, fireEvent, render, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './button.stories'

const { Default } = composeStories(stories)

describe('ButtonTests', () => {
  it('button should be render', () => {
    expect(render(<Default />).getByRole('button')).toBeInTheDocument()
  })

  it('button onClick event should work', () => {
    const onClick = jest.fn()
    render(<Default onClick={onClick} />)
    expect(onClick).toHaveBeenCalledTimes(0)
    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('button should be disabled', () => {
    const onClick = jest.fn()
    render(<Default disabled onClick={onClick} />)
    const button = screen.getByRole('button')
    expect(onClick).toHaveBeenCalledTimes(0)
    act(() => {
      fireEvent.click(button)
    })
    expect(button).toBeDisabled()
    expect(onClick).toHaveBeenCalledTimes(0)
  })

  it('loading button should be unclickable', () => {
    const onClick = jest.fn()
    render(<Default loading onClick={onClick} />)
    expect(onClick).toHaveBeenCalledTimes(0)
    expect(screen.getByRole('button')).toHaveClass('pointer-events-none')
    expect(onClick).toHaveBeenCalledTimes(0)
  })

  it('loading button should have spinner', () => {
    render(<Default loading />)
    expect(screen.getByTestId('loading-button-icon')).not.toHaveClass('hidden')
  })

  it('loading button should have invisible text', () => {
    render(<Default loading />)
    expect(screen.getByTestId('button-children-wrapper')).toHaveClass('opacity-0')
  })
})
