import { HomeCard } from '@/views/home-view/home-cards'
import axios from 'axios'
import { Character } from '.'
import { FC } from 'react'

interface PropsPostPage {
  posts: Character
}

const PostPage: FC<PropsPostPage> = ({ posts }) => <HomeCard posts={posts} />

export default PostPage

export async function getStaticProps() {
  const posts: Character = await axios.get('https://rickandmortyapi.com/api/character/').then(res => res.data)
  return {
    props: {
      posts,
    },
  }
}
