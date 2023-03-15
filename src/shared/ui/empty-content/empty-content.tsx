import EmptyContentIcon from '@/shared/assets/icons/common/empty-content.svg'
import { useTranslate } from '@/shared/lib'
import cn from 'classnames'
import { FCWithClassName } from '@/shared/@types'

export interface EmptyContentProps {
  text?: string
}

export const EmptyContent: FCWithClassName<EmptyContentProps> = ({ text, className = '' }) => {
  const { t } = useTranslate(['common'])

  return (
    <div className={cn('flex flex-col items-center justify-center w-full gap-6 pt-16 pb-large', className)}>
      <EmptyContentIcon className='fill-border' />
      <h6 className='text-background-primary'>{text || t('noData')}</h6>
    </div>
  )
}
