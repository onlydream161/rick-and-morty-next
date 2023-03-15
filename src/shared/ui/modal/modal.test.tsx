import { fireEvent, render, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './modal.stories'

const { Default } = composeStories(stories)

describe('ModalTests', () => {
  it('modal should be render after trigger', () => {
    render(<Default />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('modal should not be close after click on mask', () => {
    render(<Default />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('dialog-overlay'))
    expect(screen.queryByRole('dialog')).toBeInTheDocument()
  })

  it('mask closable should be close after click on mask', () => {
    render(<Default maskClosable />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('dialog-overlay'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('modal should be render with custom className', () => {
    const customClassName = 'custom-className'
    render(<Default className={customClassName} />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByTestId('modal-body')).toHaveClass(customClassName)
  })
})
