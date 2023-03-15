import { FC } from 'react'
import { toast } from 'react-toastify'
import { useTranslate } from '../change-language'
import Error from '@/shared/assets/icons/common/error.svg'
import Success from '@/shared/assets/icons/common/success.svg'
import Info from '@/shared/assets/icons/common/info.svg'

export type NotifyType = 'success' | 'error' | 'info'

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
      title: t('Success'),
      icon: Success,
      iconStyle: 'stroke-green',
    },
    error: {
      title: t('Error'),
      icon: Error,
      iconStyle: 'stroke-red',
    },
    info: {
      title: t('Info'),
      icon: Info,
      iconStyle: 'stroke-background-primary',
    },
  }
  const NotificationIcon = icon || DEFAULT_NOTIFICATION_BODY[status].icon
  return (
    <div className=' flex-col justify-center py-5 px-large max-w-[380px] w-full gap-base rounded-base'>
      <div className='flex gap-2.5'>
        <NotificationIcon
          data-testid='notification-icon'
          className={`flex-shrink-0 ${DEFAULT_NOTIFICATION_BODY[status].iconStyle}`}
        />
        <h2 className='text-black'>{title || DEFAULT_NOTIFICATION_BODY[status].title}</h2>
      </div>
      {payload && <h4 className='text-text'>{payload}</h4>}
    </div>
  )
}

export const notify = (payload: string, settings?: Omit<NotificationProps, 'payload' | 't'>) =>
  toast(<Notification {...settings} payload={payload} />)
