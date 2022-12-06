import { composeStories } from '@storybook/testing-react'
import { act, render, screen, waitFor } from '@/jest/utils'
import userEvent from '@testing-library/user-event'
import * as stories from './tooltip.stories'

const { Default } = composeStories(stories)

// стили самого тултипа от placement протестить не получится, т.к. в тестовом окружении у него всегда одни и теже стили
// так же тесты выкидывают warnings на act, видимо из-за того, что там постоянно происходят какие-то изменения стейта при ховере
describe('TooltipTests', () => {
  it('tooltip should be render on hover', async () => {
    render(<Default />)
    await act(async () => await userEvent.hover(screen.getByRole('button')))
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument())
  })

  it('inactive tooltip should not be render on hover', async () => {
    render(<Default isActive={false} />)
    await act(async () => await userEvent.hover(screen.getByRole('button')))
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })

  it('tooltip should be render label', async () => {
    render(<Default />)
    await act(async () => await userEvent.hover(screen.getByRole('button')))
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Test Storybook tooltip' })).toBeInTheDocument())
  })

  it('top tooltip should be render arrow with correct styles', async () => {
    render(<Default />)
    await act(async () => await userEvent.hover(screen.getByRole('button')))
    await waitFor(() =>
      expect(screen.getByTestId('tooltip-arrow')).toHaveClass(
        'bottom-0 left-1/2 -translate-x-1/2 translate-y-full rotate-180'
      )
    )
  })

  it('right tooltip should be render arrow with correct styles', async () => {
    render(<Default placement='right' />)
    await act(async () => await userEvent.hover(screen.getByRole('button')))
    await waitFor(() =>
      expect(screen.getByTestId('tooltip-arrow')).toHaveClass('-left-[10px] bottom-1/2 translate-y-1/2 -rotate-90')
    )
  })

  it('left tooltip should be render arrow with correct styles', async () => {
    render(<Default placement='left' />)
    await act(async () => await userEvent.hover(screen.getByRole('button')))
    await waitFor(() =>
      expect(screen.getByTestId('tooltip-arrow')).toHaveClass('-right-[10px] bottom-1/2 translate-y-1/2 rotate-90')
    )
  })

  it('bottom tooltip should be render arrow with correct styles', async () => {
    render(<Default placement='bottom' />)
    await act(async () => await userEvent.hover(screen.getByRole('button')))
    await waitFor(() =>
      expect(screen.getByTestId('tooltip-arrow')).toHaveClass('top-0 left-1/2 -translate-x-1/2 -translate-y-full')
    )
  })

  it('tooltip should be render with custom className', async () => {
    const customClassName = 'custom-className'
    render(<Default className={customClassName} />)
    await act(async () => await userEvent.hover(screen.getByRole('button')))
    await waitFor(() => expect(screen.getByRole('tooltip')).toHaveClass(customClassName))
  })

  it('tooltip should be render label with custom className', async () => {
    const customClassName = 'custom-className'
    render(<Default labelClassName={customClassName} />)
    await act(async () => await userEvent.hover(screen.getByRole('button')))
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Test Storybook tooltip' })).toHaveClass(customClassName)
    )
  })
})
