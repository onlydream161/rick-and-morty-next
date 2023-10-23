import { CollectionResponse } from '@/shared/@types'

export const getNextPage = (lastPage: CollectionResponse, pages: CollectionResponse[], limit: number) =>
  Math.ceil(lastPage['hydra:totalItems'] / limit) > pages.length ? pages.length + 1 : false
