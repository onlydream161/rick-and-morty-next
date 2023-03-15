import '@testing-library/jest-dom/extend-expect'
// Через import не хочет работать
const mockRouter = require('next-router-mock')

global.ResizeObserver = require('resize-observer-polyfill')

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}))

jest.mock('next/router', () => mockRouter)
jest.mock('next/dist/client/router', () => mockRouter)
jest.mock('next/dist/shared/lib/router-context', () => {
  const { createContext } = require('react')
  const router = mockRouter.default
  const RouterContext = createContext(router)
  return { RouterContext }
})

const mockIntersectionObserver = jest.fn()
// При необходимости можно добавить еще моки
jest.mock('swiper/css', jest.fn())
jest.mock('swiper/css/navigation', jest.fn())
jest.mock('swiper/css/mousewheel', jest.fn())
jest.mock('swiper/css/pagination', jest.fn())

mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

Object.assign(navigator, {
  clipboard: {
    writeText: async () => Promise.resolve(),
  },
})

jest.mock('lodash.debounce', () =>
  jest.fn(fn => {
    fn.cancel = jest.fn()
    return fn
  })
)
