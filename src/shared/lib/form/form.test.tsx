import { render, RenderResult } from '@testing-library/react'
import { Form } from '.'

describe('FormTests', () => {
  let component = {} as RenderResult

  beforeEach(() => {
    component = render(<Form onSubmit={() => console.error(123)} />)
  })

  it('component should be render', () => {
    expect(component.container).toBeInTheDocument()
  })
})
