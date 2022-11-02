import { FC } from 'react'
import Error from '@/shared/assets/icons/common/error.svg'
import Success from '@/shared/assets/icons/common/success.svg'
import { toast } from 'react-toastify'
import { useTranslate } from '../change-language'

export type NotifyType = 'success' | 'error'

export interface NotificationProps {
  status: NotifyType
  title?: string
  payload?: string
  icon?: FC
}

export const Notification: FC<NotificationProps> = ({ status, title, payload, icon }) => {
  const { t } = useTranslate(['common'])

  const DEFAULT_NOTIFICATION_BODY = {
    success: {
      title: t('success'),
      icon: Success,
      iconStyle: 'fill-green stroke-green',
    },
    error: {
      title: t('error'),
      icon: Error,
      iconStyle: 'fill-red stroke-red',
    },
  }
  const NotificationIcon = icon || DEFAULT_NOTIFICATION_BODY[status].icon
  return (
    <>
      <NotificationIcon className={`flex-shrink-0 h-[32px] w-[32px] ${DEFAULT_NOTIFICATION_BODY[status].iconStyle}`} />
      <div className='flex flex-col gap-extra-small'>
        <h4 className='text-white'>{title || DEFAULT_NOTIFICATION_BODY[status].title}</h4>
        {payload && <p className='text-smalltext'>{payload}</p>}
      </div>
    </>
  )
}

export const notifySuccess = (payload = '', settings: Omit<NotificationProps, 'status' | 'payload' | 't'> = {}) =>
  toast(<Notification {...settings} status='success' payload={payload} />)
export const notifyError = (payload = '', settings: Omit<NotificationProps, 'status' | 'payload' | 't'> = {}) =>
  toast(<Notification {...settings} status='error' payload={payload} />)
