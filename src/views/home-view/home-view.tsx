import Link from 'next/link'
import { FC } from 'react'

export const HomePage: FC = () => (
  <section className='container flex flex-col min-w-[1440px] mt-[100px] pb-[50px]'>
    <h2 className='text-center mb-base'>Rick and Morty</h2>
    <Link href={'/posts'}>Posts</Link>
    <Link href={'/query'}>Query</Link>
  </section>
)
