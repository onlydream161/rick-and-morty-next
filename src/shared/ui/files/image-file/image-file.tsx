import { FC } from 'react'
import Close from '@/shared/assets/icons/common/close_secondary.svg'
import Link from 'next/link'
import cn from 'classnames'
import { FileModel } from '@/shared/@types'

export interface ImageFileProps {
  image: FileModel
  className?: string
  alternativeText?: string
  onRemove?: (image: FileModel) => void
}

export const ImageFile: FC<ImageFileProps> = ({ image, className = '', alternativeText, onRemove }) => {
  const isLoading = image.loading

  return (
    <div className='relative inline-flex'>
      {isLoading ? (
        <div className='animate-pulse bg-lines w-[60px] h-[60px] rounded-lg' />
      ) : (
        <Link href={image.url}>
          <a target='_blank' rel='noopener noreferrer'>
            <img
              key={image.id}
              src={image.url}
              alt={alternativeText || image.name}
              className={cn('w-[60px] h-[60px] rounded-lg', {
                [className]: className,
              })}
            />
          </a>
        </Link>
      )}
      {!isLoading && (
        <button
          type='button'
          onClick={e => {
            e.stopPropagation()
            onRemove?.(image)
          }}
          className='absolute top-[3px] right-[3px]'
        >
          <Close className='w-4 h-4 icon-base fill-primary' />
        </button>
      )}
    </div>
  )
}
