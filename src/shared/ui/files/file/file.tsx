import { FC } from 'react'
import cn from 'classnames'
import DownLoad from '/public/icons/common/download.svg'
import Close from '/public/icons/common/close.svg'
import Loading from '/public/icons/common/loading.svg'
import { FileModel } from '@/shared/@types'

export interface FileProps {
  file: FileModel
  className?: string
  onRemove?: (file: FileModel) => void
}

export const File: FC<FileProps> = ({ file, className = '', onRemove }) => {
  const isLoading = file.loading

  return (
    <div
      className={cn(
        'flex items-center gap-extra-small max-w-full w-fit rounded-lg px-small h-[27px] bg-background-primary',
        {
          [className]: className,
        }
      )}
    >
      {!isLoading && (
        <a download href={file.url}>
          <DownLoad className='w-4 h-4 icon-base fill-primary' />
        </a>
      )}
      <div className='flex items-center overflow-hidden gap-small text-subtext'>
        <p className='text-white truncate'>{file.name}</p>
      </div>
      {isLoading ? (
        <Loading className='fill-primary w-small h-small animate-spin' />
      ) : (
        <button type='button' onClick={() => onRemove?.(file)}>
          <Close className='icon-base fill-primary w-small h-small' />
        </button>
      )}
    </div>
  )
}
