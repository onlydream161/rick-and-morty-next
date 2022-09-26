import { FC } from 'react'
import EmptyContentIcon from '@/shared/assets/icons/common/empty-content.svg'
import { useTranslate } from '@/features/change-language'
import cn from 'classnames'

export interface EmptyContentProps {
  text?: string
  className?: string
}

export const EmptyContent: FC<EmptyContentProps> = ({ text, className = '' }) => {
  const { t } = useTranslate(['common'])

  return (
    <div
      className={cn('flex flex-col items-center justify-center w-full gap-6 pt-16 pb-large', {
        [className]: className,
      })}
    >
      <EmptyContentIcon className='fill-lines' />
      <h6 className='text-gray'>{text || t('noData')}</h6>
    </div>
  )
}
