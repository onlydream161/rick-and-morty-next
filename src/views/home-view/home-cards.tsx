import { Character } from '@/pages'
import Image from 'next/image'
import Link from 'next/link'

import { FC } from 'react'

interface HomeCardtype {
  posts: Character
}

export const HomeCard: FC<HomeCardtype> = ({ posts }) => {
  const cards = posts.results
  return (
    <section className='container flex  min-w-[1440px] mt-[100px] pb-[50px]'>
      <div className='flex flex-wrap justify-center gap-3'>
        {cards.map(card => (
          <div
            className='w-64  flex justify-centerv items-center p-5 flex-col border border-slate-200 rounded-lg'
            key={card.id}
          >
            <h1>{card.name}</h1>
            <Link href={`/posts/${card.id}`}>
              <Image className=' hover:cursor-pointer' width={200} height={200} src={card.image} alt={card.name} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
