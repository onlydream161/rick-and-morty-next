import { fireEvent, render, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import userEvent from '@testing-library/user-event'
import { FieldError } from 'react-hook-form'
import * as stories from './checkbox.stories'

const { Default } = composeStories(stories)

describe('CheckboxTests', () => {
  it('checkbox should be render', () => {
    render(<Default />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('checkbox input should be able to check', async () => {
    render(<Default />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    await userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('checkbox label should be able to check', async () => {
    render(<Default />)
    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByTestId('checkbox-label')
    expect(checkbox).not.toBeChecked()
    await userEvent.click(label)
    expect(checkbox).toBeChecked()
    await userEvent.click(label)
    expect(checkbox).not.toBeChecked()
  })

  it('disabled checkbox should be disable', () => {
    render(<Default disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('disabled checkbox should be unclickable', async () => {
    render(<Default disabled />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('disabled checkbox"s label should be unclickable', () => {
    render(<Default disabled />)
    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByTestId('checkbox-label')
    expect(checkbox).not.toBeChecked()
    // Через userEvent чекается по нажатию на label, но если через fireEvent, то чекается при нажатии на checkbox T_T
    fireEvent.click(label)
    expect(checkbox).not.toBeChecked()
  })

  it('valid checkbox should not render error message', () => {
    render(<Default />)
    expect(screen.queryByTestId('checkbox-error-message')).not.toBeInTheDocument()
  })

  it('invalid checkbox should render error message', () => {
    render(<Default error={{ message: 'Error text' } as FieldError} />)
    const errorMessage = screen.queryByTestId('checkbox-error-message')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveTextContent('Error text')
  })

  it('invalid checkbox should render custrom error styles', () => {
    render(<Default error={{ message: 'Error text' } as FieldError} />)
    expect(screen.getByTestId('checkbox-label')).toHaveClass('before:border-red')
  })
})
