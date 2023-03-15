import { act, fireEvent, render, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import userEvent from '@testing-library/user-event'
import * as stories from './select-search.stories'

const { Default, Empty } = composeStories(stories)

describe('Select Search Tests', () => {
  it('Select Search should be render', () => {
    expect(render(<Default />).container).toBeInTheDocument()
  })

  it('Select Search with empty options should be render', () => {
    expect(render(<Empty />).container).toBeInTheDocument()
  })

  it('Select Search should trigger onChange on option select', async () => {
    const onChange = jest.fn()

    render(<Default onChange={onChange} />)

    expect(onChange).toHaveBeenCalledTimes(0)

    await act(() => userEvent.click(screen.getByTestId('select-search-dropdown-button')))
    await act(() => userEvent.click(screen.getAllByRole('heading')[1]))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('Select Search should trigger onChange on reset combobox', async () => {
    const onChange = jest.fn()

    render(<Default value={1} onChange={onChange} />)

    expect(onChange).toHaveBeenCalledTimes(0)

    await act(() => userEvent.click(screen.getByTestId('reset-button')))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(null)
  })

  it('Select Search should trigger onSearch on type in input', () => {
    const searchValue = 'searchValue'
    const onSearch = jest.fn()

    render(<Default onSearch={onSearch} />)

    expect(onSearch).toHaveBeenCalledTimes(0)

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: searchValue },
    })

    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith(searchValue)
  })
})
