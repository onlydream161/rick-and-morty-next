import { act, fireEvent, render } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './admin-pagination.stories'

const { Default, WithPageSize } = composeStories(stories)

describe('PaginationTests', () => {
  it('component should be render', () => {
    const component = render(<Default />)
    expect(component.container).toBeInTheDocument()
  })

  it('pagination should change page', () => {
    const component = render(<WithPageSize />)
    const itemsOnPage = component.getByTestId('items-on-page')
    expect(itemsOnPage).toHaveTextContent('1-5 of 150')
    act(() => {
      fireEvent.click(component.getByTestId('right-button'))
    })
    expect(itemsOnPage).toHaveTextContent('6-150 of 150')
    act(() => {
      fireEvent.click(component.getByTestId('left-button'))
    })
    expect(itemsOnPage).toHaveTextContent('1-5 of 150')
  })

  it('pagination buttons should disable if it is last page', () => {
    const component = render(<WithPageSize />)
    const leftButton = component.getByTestId('left-button')
    const rightButton = component.getByTestId('right-button')
    expect(leftButton).toBeDisabled()
    expect(rightButton).not.toBeDisabled()
    act(() => {
      fireEvent.click(rightButton)
    })
    expect(leftButton).not.toBeDisabled()
    expect(rightButton).toBeDisabled()
  })

  it('component should be render with page size options, change page size should be work', () => {
    const component = render(<WithPageSize />)
    expect(component.getByText('5')).toBeInTheDocument()
    expect(component.getByText('1-5 of 150')).toBeInTheDocument()

    act(() => {
      fireEvent.click(component.getByTestId('page-size-select'))
    })
    expect(component.getByText('50')).toBeInTheDocument()
    act(() => {
      fireEvent.click(component.getByText('50'))
    })
    expect(component.getByText('1-50 of 150')).toBeInTheDocument()
  })

  it('pagination should change page', () => {
    const component = render(<WithPageSize />)
    const itemsOnPage = component.getByTestId('items-on-page')
    expect(itemsOnPage).toHaveTextContent('1-5 of 150')
    act(() => {
      fireEvent.click(component.getByTestId('right-button'))
    })
    expect(itemsOnPage).toHaveTextContent('6-150 of 150')
    act(() => {
      fireEvent.click(component.getByTestId('left-button'))
    })
    expect(itemsOnPage).toHaveTextContent('1-5 of 150')
  })

  it('pagination buttons should disable if it is last page', () => {
    const component = render(<WithPageSize />)
    const leftButton = component.getByTestId('left-button')
    const rightButton = component.getByTestId('right-button')
    expect(leftButton).toBeDisabled()
    expect(rightButton).not.toBeDisabled()
    act(() => {
      fireEvent.click(rightButton)
    })
    expect(leftButton).not.toBeDisabled()
    expect(rightButton).toBeDisabled()
  })

  it('component should be render with page size options, change page size should be work', () => {
    const component = render(<WithPageSize />)
    expect(component.getByText('5')).toBeInTheDocument()
    expect(component.getByText('1-5 of 150')).toBeInTheDocument()

    act(() => {
      fireEvent.click(component.getByTestId('page-size-select'))
    })
    expect(component.getByText('50')).toBeInTheDocument()
    act(() => {
      fireEvent.click(component.getByText('50'))
    })
    expect(component.getByText('1-50 of 150')).toBeInTheDocument()
  })
})
