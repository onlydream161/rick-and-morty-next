import { PostIdType } from '@/pages/posts/[id]'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const CardFullScreen = ({ character }: PostIdType) => (
  <div className='flex items-center flex-col justify-center'>
    <h1>{character.name}</h1>
    <Image src={character.image} alt={character.name} width={250} height={250} />
    <p className=' text-xl mb-5 '>{character.gender}</p>
    <p className=' text-base mb-5'>{character.status}</p>
    <p className=' text-base mb-5'>{character.species}</p>
    <Link className=' mt-16' href={'/posts'}>
      Back
    </Link>
  </div>
)
