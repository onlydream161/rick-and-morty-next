import Mock from 'mockjs'
import { rest } from 'msw'
import { addBaseDataURL } from '../helpers'

export const auth = [
  rest.post(addBaseDataURL('/token'), (_, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json(
        Mock.mock({
          token_type: 'Bearer',
          expires_in: 3600,
          access_token: '@guid',
          refresh_token: '@guid',
        })
      )
    )
  }),
]
