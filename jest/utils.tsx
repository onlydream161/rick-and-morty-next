import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { FCWithChildren } from '@/shared/@types'
import { withProviders } from '@/app/providers'

import('@/app/mocks-server/server').then(mod => mod.server.listen())

const TestWrapper: FCWithChildren = ({ children }) => {
  return <>{children}</>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: withProviders(TestWrapper), ...options })

export * from '@testing-library/react'
export { customRender as render }
