import Mock from 'mockjs'
import { rest } from 'msw'
import { addBaseDataURL } from '../helpers'

export const users = [
  rest.get(addBaseDataURL('/current'), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(Mock.mock(USER_ENTITY_MOCK)))
  }),
]

const USER_ENTITY_MOCK = {
  'id|+1': 1,
  email: '@email',
  enabled: true,
  firstName: '@first',
  fullName: '@name(true)',
  lastName: '@last',
  middleName: '@first',
  username: '@word',
} as { [key: string]: unknown }
