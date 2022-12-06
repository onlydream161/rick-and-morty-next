import { FC } from 'react'
import { toast } from 'react-toastify'
import { useTranslate } from '../change-language'
import Error from '@/shared/assets/icons/common/error.svg'
import Success from '@/shared/assets/icons/common/success.svg'

export type NotifyType = 'success' | 'error'

export interface NotificationProps {
  status?: NotifyType
  title?: string
  payload?: string
  icon?: FC
}

export const Notification: FC<NotificationProps> = ({ status = 'success', title, payload, icon }) => {
  const { t } = useTranslate(['common'])

  const DEFAULT_NOTIFICATION_BODY = {
    success: {
      title: t('success'),
      icon: Success,
      iconStyle: 'stroke-green',
    },
    error: {
      title: t('error'),
      icon: Error,
      iconStyle: 'stroke-red',
    },
  }
  const NotificationIcon = icon || DEFAULT_NOTIFICATION_BODY[status].icon
  return (
    <>
      <div className='flex items-center gap-base desktop:gap-5'>
        <NotificationIcon
          data-testid='notification-icon'
          className={`flex-shrink-0 ${DEFAULT_NOTIFICATION_BODY[status].iconStyle}`}
        />
        <h4 className='croogla-mobile desktop:croogla-text'>{title || DEFAULT_NOTIFICATION_BODY[status].title}</h4>
      </div>
      {payload && <p className='source-mobile-text desktop:source-text'>{payload}</p>}
    </>
  )
}

export const notify = (payload: string, settings?: Omit<NotificationProps, 'payload' | 't'>) =>
  toast(<Notification {...settings} payload={payload} />)
