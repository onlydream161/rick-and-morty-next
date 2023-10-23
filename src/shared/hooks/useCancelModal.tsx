import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '@/shared/ui'
import { Modal } from '@/shared/ui/modal'
import { Nullable } from '@/shared/@types'
import { useRouter } from 'next/router'
import { atom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import cn from 'classnames'

interface CanselModalProps {
  modalData: {
    title: string
    description: string
    acceptAction: string
    declineAction: string
  }
  isNeedListen?: boolean
  variant?: 'cancel' | 'save'
  modalClassName?: string
}
export const isHaveChangesAtom = atom(false)

export const useCancelModal = ({
  modalData,
  isNeedListen = false,
  variant = 'cancel',
  modalClassName,
}: CanselModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [onAgree, setOnAgree] = useState<Nullable<() => void>>(null)
  const [isNeedListenUrl, setIsNeedListenUrl] = useState(() => isNeedListen)
  const [isOnAgreeLoading, setIsOnAgreeLoading] = useState(false)
  const [url, setUrl] = useState<Nullable<string>>(null)
  const setIsHaveChanges = useUpdateAtom(isHaveChangesAtom)
  const router = useRouter()

  const closeModal = () => {
    setIsOpen(false)
  }

  const changeListenMode = (mode: boolean) => {
    setIsNeedListenUrl(mode)
  }

  const openModal = (cb?: () => void) => {
    setIsOpen(true)
    cb && setOnAgree(() => cb)
  }

  const onRouteChangeStart = useCallback(
    (nextPath: string) => {
      if (!isNeedListenUrl) {
        return
      }

      setIsOpen(true)
      setUrl(nextPath)
      router.events.emit('routeChangeError', new Error('cancelRouteChange'), nextPath, { shallow: false })
      throw 'cancelRouteChange'
    },
    [isNeedListen, isNeedListenUrl]
  )
  const onAgreeHandler = async () => {
    try {
      setIsOnAgreeLoading(true)
      removeListener()
      onAgree && (await onAgree())
      closeModal()
      setIsHaveChanges(false)
      url && router.push(url)
    } finally {
      setIsOnAgreeLoading(false)
    }
  }

  useEffect(() => {
    return () => setIsHaveChanges(false)
  }, [])
  const removeListener = () => {
    router.events.off('routeChangeStart', onRouteChangeStart)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', onRouteChangeStart)
    return removeListener
  }, [router, onRouteChangeStart])

  const ModalComponent = useMemo(() => {
    return () => {
      return (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className={cn('flex flex-col items-center max-w-lg text-center', modalClassName)}
        >
          <>
            <h2 className='mb-5 text-black'>{modalData.title}</h2>
            <h4 className='mb-10 text-text'>{modalData.description}</h4>
            <div className='flex items-center justify-between w-full gap-5 text-center'>
              <Button
                variant={variant !== 'save' ? 'contained' : 'outlined'}
                color='secondary'
                size='large'
                className='flex-grow'
                onClick={closeModal}
              >
                <h3>{modalData.declineAction}</h3>
              </Button>
              <Button
                variant={variant === 'save' ? 'contained' : 'outlined'}
                color={variant === 'cancel' ? 'secondary' : 'primary'}
                size='large'
                className='flex-grow'
                loading={isOnAgreeLoading}
                onClick={onAgreeHandler}
              >
                <h3>{modalData.acceptAction}</h3>
              </Button>
            </div>
          </>
        </Modal>
      )
    }
  }, [isOpen, modalClassName, modalData, variant])

  return {
    CancelModal: ModalComponent,
    closeModal,
    openModal,
    changeListenMode,
  }
}
