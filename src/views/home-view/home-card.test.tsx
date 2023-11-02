import { render, screen } from '@testing-library/react'
import { HomeCard } from './home-cards'

const posts = {
  info: {
    count: 826,
    pages: 42,
    next: 'https://rickandmortyapi.com/api/character/?page=2',
    prev: null,
  },
  results: [
    {
      id: 361,
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
    },
    {
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
    },
  ],
}

const pathtest = 'posts'

test('render cards', () => {
  render(<HomeCard posts={posts} path={pathtest} />)
  const imgs = screen.getAllByText(/Toxic Rick/i)
  imgs.forEach(item => {
    expect(item).toBeInTheDocument()
  })
})
