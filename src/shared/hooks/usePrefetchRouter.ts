import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const usePrefetchRouter = (routes: string | string[]) => {
  const router = useRouter()

  useEffect(() => {
    if (Array.isArray(routes)) {
      routes.forEach(route => router.prefetch(route))
    } else {
      router.prefetch(routes)
    }
  }, [routes])

  return router
}
