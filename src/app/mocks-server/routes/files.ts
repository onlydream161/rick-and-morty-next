import { mock } from 'mockjs'
import { rest } from 'msw'
import { FILE_ENTITY_MOCK } from '@/shared/config'
import { addBaseDataURL } from '../helpers'

export const files = [
  rest.post(addBaseDataURL('/files'), (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(mock(FILE_ENTITY_MOCK)))
  }),
]
