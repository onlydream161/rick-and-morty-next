import { Dialog, Transition } from '@headlessui/react'
import React, { FC, Fragment, PropsWithChildren, useEffect } from 'react'
import Close from '@/shared/assets/icons/common/close.svg'
import { useRouter } from 'next/router'

export interface ModalProps {
  isOpen: boolean
  maskClosable?: boolean
  withCloseIcon?: boolean
  className?: string
  onClose: () => void
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  isOpen,
  maskClosable,
  withCloseIcon = true,
  className = '',
  onClose,
}) => {
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
          <Dialog.Overlay className='fixed bg-[#000] bg-opacity-60 backdrop-blur-[9px] inset-0 will-change-auto' />
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
          <div className={`relative will-change-transform ${className}`}>
            {children}
            {withCloseIcon && (
              <button className='absolute -right-[19px] translate-x-full top-[9px]' onClick={onClose}>
                <Close className=' fill-[#fff] hover:drop-shadow-icon-hover h-[14px] w-[14px]' />
              </button>
            )}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
