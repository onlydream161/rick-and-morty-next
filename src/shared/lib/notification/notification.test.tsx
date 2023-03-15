import { fireEvent, render, renderWithProviders, waitFor, screen } from '@/jest/utils'

import { composeStories } from '@storybook/testing-react'
import { notify } from './notification'
import * as stories from './notification.stories'

const { Default } = composeStories(stories)

describe('NotificationTests', () => {
  it('Success should be render', () => {
    const component = render(<Default status='success' />)
    expect(component.container).toBeInTheDocument()
    expect(screen.getByTestId('notification-icon')).toHaveClass('stroke-green')
    expect(screen.getByText(/success/i)).toBeInTheDocument()
  })
  it('Error should be render', () => {
    const component = render(<Default status='error' />)
    expect(component.container).toBeInTheDocument()
    expect(screen.getByTestId('notification-icon')).toHaveClass('stroke-red')
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })
  it('Info should be render', () => {
    const component = render(<Default status='info' />)
    expect(component.container).toBeInTheDocument()
    expect(screen.getByTestId('notification-icon')).toHaveClass('stroke-background-primary')
    expect(screen.getByText(/info/i)).toBeInTheDocument()
  })
})

describe('NotifyTests', () => {
  it('notify success should be render with correct titles and icon styles ', async () => {
    renderWithProviders(<button onClick={() => notify('test', { status: 'success' })} />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Success' })).toBeInTheDocument())
    expect(screen.getByTestId('notification-icon')).toHaveClass('stroke-green')
  })

  it('notify without status should be render with correct success status ', async () => {
    renderWithProviders(<button onClick={() => notify('test')} />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Success' })).toBeInTheDocument())
    expect(screen.getByTestId('notification-icon')).toHaveClass('stroke-green')
  })

  it('notify should be render with custom payload', async () => {
    const payload = 'custom-payload'
    renderWithProviders(<button onClick={() => notify(payload)} />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByText(payload)).toBeInTheDocument())
  })

  it('notify should be render with custom title', async () => {
    const title = 'custom-title'
    renderWithProviders(
      <button
        onClick={() =>
          notify('test', {
            title,
          })
        }
      />
    )
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByRole('heading', { name: title })).toBeInTheDocument())
  })

  it('notification should be render with custom icon and icon styles', async () => {
    const icon = () => <svg data-testid='custom-notification-icon'></svg>
    renderWithProviders(
      <button
        onClick={() =>
          notify('test', {
            icon,
          })
        }
      />
    )
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByTestId('custom-notification-icon')).toBeInTheDocument())
  })
})
