import { render, RenderResult } from '@/jest/utils'
import { Form } from '.'

describe('FormTests', () => {
  let component = {} as RenderResult

  beforeEach(() => {
    component = render(<Form onSubmit={() => console.error(123)} />)
  })

  it('component should be render', async () => {
    expect(component.container).toBeInTheDocument()
  })
})
