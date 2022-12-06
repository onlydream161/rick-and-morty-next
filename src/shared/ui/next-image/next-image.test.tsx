import { fireEvent, render, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './next-image.stories'

const { Default, NoImage } = composeStories(stories)

describe('NextImageTests', () => {
  it('next image should be render', () => {
    render(<Default />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('next image without src should be render no photo', () => {
    render(<NoImage />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByTestId('image-no-photo')).toBeInTheDocument()
  })

  it('next image with broken img should be render no photo and trigger error callback', () => {
    const onError = jest.fn()
    render(<Default onError={onError} />)
    fireEvent.error(screen.getByRole('img'))
    expect(screen.getByTestId('image-no-photo')).toBeInTheDocument()
    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('next image without demensions should be render with fill property', () => {
    render(<Default />)
    expect(screen.getByRole('img').dataset.nimg).toEqual('fill')
  })
})
