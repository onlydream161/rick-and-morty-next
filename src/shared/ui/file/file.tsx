import { FCWithClassName, FileModel } from '@/shared/@types'
import { OptionalLinkWrapper } from '@/shared/lib'
import { ALLOWED_IMAGES_EXT } from '@/shared/config'
import { getFileExtension } from '@/shared/helpers'
import { NextImage } from '../next-image'
import cn from 'classnames'
import Close from '@/shared/assets/icons/common/file-close.svg'
import Loading from '@/shared/assets/icons/common/loading.svg'
import Skeleton from 'react-loading-skeleton'

export interface FileProps {
  file: FileModel
  onRemove?: (file: FileModel) => void
}

export const File: FCWithClassName<FileProps> = ({ file, className = '', onRemove }) => {
  const isLoading = file.loading

  const isImage = ALLOWED_IMAGES_EXT.includes(getFileExtension(file).toUpperCase())

  const CloseButton: FCWithClassName = ({ className }) => (
    <button
      data-testid='file-close-button'
      type='button'
      className={cn(
        'flex items-center justify-center w-[23px] h-[23px] bg-border rounded-full hover:bg-background-primary active:bg-text transition-colors',
        className
      )}
      onClick={e => {
        e.preventDefault()
        onRemove?.(file)
      }}
    >
      <Close className='stroke-black' />
    </button>
  )

  return (
    <OptionalLinkWrapper href={file.path} newTab>
      {isImage ? (
        isLoading ? (
          <Skeleton
            containerTestId='image-skeleton'
            width={140}
            height={100}
            containerClassName='pointer-events-none'
          />
        ) : (
          <div data-testid='image-file' className='relative w-fit h-[100px]'>
            <NextImage src={file.path} width={140} height={100} className='rounded-base' />
            <CloseButton className='absolute top-1 right-1' />
          </div>
        )
      ) : (
        <div
          data-testid='file'
          className={cn(
            `flex items-center gap-small max-w-full w-fit rounded-base pl-3 pr-1 h-[31px]
       bg-background-primary hover:bg-background-secondary active:bg-background-tertiary transition-colors border-none`,
            className
          )}
        >
          <h4 className='w-[116px] text-white truncate'>{file.name}</h4>
          {isLoading ? (
            <Loading data-testid='file-preloader' className='w-4 h-4 mr-2 fill-white animate-spin shrink-0' />
          ) : (
            <CloseButton />
          )}
        </div>
      )}
    </OptionalLinkWrapper>
  )
}
