import { act, fireEvent, renderHook, screen } from '@testing-library/react'
import { useCancelModal } from '@/shared/hooks'
import { render } from '@/jest/utils'
import mockRouter from 'next-router-mock'

const modalData = {
  title: 'Отменить изменения?',
  description: 'Произведенные действия и заполненные данные нельзя будет восстановить',
  acceptAction: 'Подтвердить',
  declineAction: 'Назад',
}

describe('useCancelModal', () => {
  it('should be work without listen', async () => {
    renderHook(() =>
      useCancelModal({
        modalData,
        isNeedListen: false,
      })
    )
    act(() => {
      expect(() => {
        mockRouter.events.emit('routeChangeStart', 'test')
      }).not.toThrow()
    })
  })

  it('should be open modal', async () => {
    const view = renderHook(() =>
      useCancelModal({
        modalData,
      })
    )

    const { rerender } = render(<view.result.current.CancelModal />)
    act(() => {
      view.result.current.openModal()
    })
    rerender(<view.result.current.CancelModal />)
    expect(await screen.findByText(modalData.title)).toBeInTheDocument()
  })

  it('should be close modal', async () => {
    const view = renderHook(() =>
      useCancelModal({
        modalData,
      })
    )

    const { rerender } = render(<view.result.current.CancelModal />)
    act(() => {
      view.result.current.openModal()
    })
    rerender(<view.result.current.CancelModal />)
    expect(await screen.findByText(modalData.title)).toBeInTheDocument()
    act(() => {
      view.result.current.closeModal()
    })
    rerender(<view.result.current.CancelModal />)
    expect(await screen.queryByText(modalData.title)).not.toBeInTheDocument()
  })

  it('should be close modal and call callback', async () => {
    const view = renderHook(() =>
      useCancelModal({
        modalData,
        isNeedListen: false,
      })
    )

    const { rerender } = render(<view.result.current.CancelModal />)
    const cb = jest.fn()
    act(() => {
      view.result.current.openModal(cb)
    })
    rerender(<view.result.current.CancelModal />)
    fireEvent.click(await screen.findByText(modalData.acceptAction))
    expect(cb).toBeCalled()
  })

  it('should be close modal and url change', async () => {
    const view = renderHook(() =>
      useCancelModal({
        modalData,
        isNeedListen: true,
      })
    )

    const { rerender } = render(<view.result.current.CancelModal />)

    act(() => {
      mockRouter.push('test').catch(e => {
        expect(e).toBe('cancelRouteChange')
      })
    })
    rerender(<view.result.current.CancelModal />)
    fireEvent.click(await screen.findByText(modalData.acceptAction))
    expect(mockRouter.asPath).toBe('test')
  })
})
