import { auth, users } from './routes'

export const handlers = [...auth, ...users]

export const storybookHandlers = {
  auth,
  users,
}
