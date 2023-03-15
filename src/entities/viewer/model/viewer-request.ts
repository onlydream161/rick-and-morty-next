import { queryFetchFactory } from '@/shared/lib'
import { User, VIEWER_REQUEST_TARGET } from '../lib'

export const queryFetchViewer = queryFetchFactory<User>(VIEWER_REQUEST_TARGET)
