import * as NextImage from 'next/image'
import { i18n } from './i18next.js'
import { SkeletonTheme } from 'react-loading-skeleton'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import '@/app/index.css'

const OriginalNextImage = NextImage.default

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    ru: 'Russian',
  },
}

export const decorators = [
  Story => (
    <MemoryRouterProvider>
      <SkeletonTheme
        inline
        borderRadius={10}
        baseColor='rgb(var(--skeleton))'
        highlightColor='rgb(var(--skeleton-highlight))'
      >
        <Story />
      </SkeletonTheme>
    </MemoryRouterProvider>
  ),
]

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <OriginalNextImage {...props} unoptimized />,
})
