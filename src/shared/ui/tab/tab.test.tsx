import { fireEvent, render, screen } from '@/jest/utils'
import { composeStories } from '@storybook/testing-react'
import * as stories from './tab.stories'

const { Default } = composeStories(stories)

describe('TabPanelTests', () => {
  it('component should be render', () => {
    expect(render(<Default />).container).toBeInTheDocument()
  })
  it('Active tab should checked', async () => {
    const onClick = jest.fn()
    render(<Default onClick={onClick} />)
    expect(onClick).toHaveBeenCalledTimes(0)
    fireEvent.click(await screen.findByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('Tabs should be remove', () => {
    const onRemove = jest.fn()

    render(<Default onRemove={onRemove} />)
    expect(onRemove).toHaveBeenCalledTimes(0)
    fireEvent.click(screen.getByTestId('remove-tab'))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})
