import { httpClient } from '@/shared/lib'
import { FC, useEffect } from 'react'

export const HomePage: FC = () => {
  useEffect(() => {
    httpClient({ url: '/current' })
  }, [])

  return (
    <section className='container flex flex-col min-w-[1440px] mt-[100px] pb-[50px]'>
      <h2 className='text-center mb-base'>EXAMPLE</h2>
    </section>
  )
}
