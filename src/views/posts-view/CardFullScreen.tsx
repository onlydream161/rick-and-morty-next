import { PostIdType } from '@/pages/posts/[id]'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

export const CardFullScreen = ({ character }: PostIdType) => {
  const router = useRouter()
  return (
    <div className='flex items-center flex-col justify-center'>
      <h1>{character?.name}</h1>
      {character?.image && <Image src={character.image} alt={character?.name} width={250} height={250} />}
      <p className=' text-xl mb-5 '>{character?.gender}</p>
      <p className=' text-base mb-5'>{character?.status}</p>
      <p className=' text-base mb-5'>{character?.species}</p>
      <button
        data-testid='button'
        className=' mt-16'
        onClick={() => {
          router.back()
        }}
      >
        Back
      </button>
    </div>
  )
}
