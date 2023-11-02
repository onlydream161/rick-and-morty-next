import { screen, render } from '@testing-library/react'
import { HomePage } from './home-view'

test('render Home page', () => {
  render(<HomePage />)
  const links = screen.queryAllByRole('link')
  links.forEach(el => {
    expect(el).toBeInTheDocument()
  })
})
