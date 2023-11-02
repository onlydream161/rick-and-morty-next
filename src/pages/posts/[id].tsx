import { CardFullScreen } from '@/views/posts-view/CardFullScreen'
import Head from 'next/head'
import { Character, Result } from '..'
import axios from 'axios'
import { useRouter } from 'next/router'

export interface PostIdType {
  character: Result | undefined
}
export interface CharacterId {
  id: string
}
export interface ParamsType {
  params: {
    id: string
  }
}

export default function PostId({ character }: PostIdType) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Загрузка...</div>
  }
  return (
    <>
      <Head>
        <title></title>
        <meta name='description' content='Generated by create next app' />
      </Head>

      <CardFullScreen character={character} />
    </>
  )
}

export const getStaticPaths = async () => {
  const characters: Character = await axios.get('https://rickandmortyapi.com/api/character/').then(res => res.data)
  const paths = characters.results.map(item => ({ params: { id: item.id.toString() } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }: ParamsType) => {
  const character: Result = await axios
    .get(`https://rickandmortyapi.com/api/character/${params.id}`)
    .then(res => res.data)

  return {
    props: { character },
  }
}