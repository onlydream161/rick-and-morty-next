import compose from 'compose-function'
import withReactQuery from './with-react-query'
import withJotai from './with-jotai'
import { appWithTranslation } from 'next-i18next'
import withSkeleton from './with-skeleton'

export const withProviders = compose(withReactQuery, withJotai, appWithTranslation, withSkeleton)
