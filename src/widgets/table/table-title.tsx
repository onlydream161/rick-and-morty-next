import { FC } from 'react'
import { Button } from '@/shared/ui'
import { useTranslate } from '@/shared/lib'
import AddIcon from '@/shared/assets/icons/common/add.svg'

export interface TableTitleProps {
  title?: string
  onClick?: () => void
}

export const TableTitle: FC<TableTitleProps> = ({ title, onClick }) => {
  const { t } = useTranslate(['common'])
  return (
    <div className='py-12 px-10 flex gap-x-5 items-center'>
      {title && <h1>{title}</h1>}
      {onClick && (
        <Button childrenClassName='flex gap-x-2.5 items-center' onClick={onClick} variant='outlined'>
          {t('Add')}
          <AddIcon className='stroke-currentColor' />
        </Button>
      )}
    </div>
  )
}
