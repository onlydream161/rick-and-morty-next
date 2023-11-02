import { screen, render, fireEvent } from '@testing-library/react'
import { CardFullScreen } from './CardFullScreen'

const card = {
  id: 1,
  name: 'Toxic Rick',
  status: 'Dead',
  species: 'Humanoid',
  type: 'Ricks Toxic Side',
  gender: 'Male',
  origin: {
    name: 'Alien Spa',
    url: 'https://rickandmortyapi.com/api/location/64',
  },
  location: {},
  image: 'https://rickandmortyapi.com/api/character/avatar/361.jpeg',
  episode: [],
  url: 'https://rickandmortyapi.com/api/character/361',
  created: '2018-01-10T18:20:41.703Z',
}
describe('test render single card', () => {
  test('render Home page', () => {
    render(<CardFullScreen character={card} />)
    const title = screen.getByAltText(/Toxic Rick/i)
    expect(title).toBeInTheDocument()
  })
  test('card button go back', () => {
    render(<CardFullScreen character={card} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(button).toBeTruthy()
  })
})
