import { auth, users, files } from './routes'

export const handlers = [...auth, ...users, ...files]

export const storybookHandlers = {
  auth,
  users,
  files,
}
