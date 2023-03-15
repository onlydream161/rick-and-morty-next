import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { FCWithChildren } from '@/shared/@types'
import cn from 'classnames'

export interface ModalProps {
  isOpen: boolean
  maskClosable?: boolean
  onClose: () => void
}

export const Modal: FCWithChildren<ModalProps> = ({ children, isOpen, maskClosable, className, onClose }) => {
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      router.events.on('routeChangeComplete', onClose)
      router.events.on('routeChangeError', onClose)
    }
    return () => {
      router.events.off('routeChangeComplete', onClose)
      router.events.off('routeChangeError', onClose)
    }
  }, [isOpen])

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto'
        onClose={() => maskClosable && onClose()}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          {/* Цвет сделал статичным, т.к. скорее всего он дожен быть одинаковым не зависимо от темы */}
          <Dialog.Overlay
            data-testid='dialog-overlay'
            className='fixed bg-[#000] bg-opacity-50 inset-0 will-change-auto'
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-200'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-150'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div
            data-testid='modal-body'
            className={cn(
              'bg-white p-[50px] rounded-base max-h-[calc(100vh-100px)] overflow-auto scrollbar will-change-transform',
              className
            )}
          >
            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
