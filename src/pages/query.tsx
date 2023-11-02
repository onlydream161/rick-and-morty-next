import { HomeCard } from '@/views/home-view/home-cards'
import axios from 'axios'
import React, { useState } from 'react'
import { QueryClient, dehydrate, useQuery } from 'react-query'

const characterList = async (id = 1) => {
  const characters = await axios.get(`https://rickandmortyapi.com/api/character/?page=${id}`).then(res => res.data)
  return characters
}

export async function getStaticProps() {
  const queryC = new QueryClient()

  await queryC.prefetchQuery(['posts', 1], () => characterList(1))

  return {
    props: {
      dehydratedState: dehydrate(queryC),
    },
  }
}

const QueryPage = () => {
  const [page, setPage] = useState(1)
  const { isLoading, data } = useQuery(['posts', page], () => characterList(page))

  return (
    <div>
      <div className='flex justify-center gap-4  m-4'>
        <button
          className=' w-14 h-5 border flex items-center justify-center'
          onClick={() => {
            page > 1 && setPage(page - 1)
          }}
        >
          prev
        </button>
        <button
          className=' w-10 h-5 border flex items-center justify-center'
          onClick={() => {
            setPage(old => old + 1)
          }}
        >
          next
        </button>
      </div>
      {isLoading ? <h1>Loading...</h1> : <HomeCard posts={data} path={'queries'} />}
    </div>
  )
}

export default QueryPage
