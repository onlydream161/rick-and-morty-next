import { ReactNode } from 'react'
import { FCWithClassName, FileModel } from '@/shared/@types'
import { forceDownload, getFileExtension, getFileNameWithoutExtension } from '@/shared/helpers'
import { Button } from '../button'
import { httpClient, useTranslate } from '@/shared/lib'
import cn from 'classnames'
import Loading from '@/shared/assets/icons/common/loading.svg'
import OpenEye from '@/shared/assets/icons/common/open-eye.svg'

export interface FileProps {
  file: FileModel
  onRemove?: (file: FileModel) => void
  extraContent?: ReactNode
  isSaved?: boolean
  showExtension?: boolean
  onView?: (file: FileModel) => void
  isDownload?: boolean
  removeButtonClassName?: string
  fileNameClassName?: string
}

export const File: FCWithClassName<FileProps> = ({
  file,
  className,
  onRemove,
  extraContent = <></>,
  isSaved,
  showExtension = true,
  isDownload = true,
  onView,
  removeButtonClassName,
  fileNameClassName,
}) => {
  const { t } = useTranslate(['common'])
  const isLoading = file.loading

  const fileExtension = getFileExtension(file)

  // Current blob size limit is around 500MB for browsers
  const downloadResource = async (src: string, filename: string) => {
    if (typeof window !== 'undefined' && isDownload) {
      const response = await httpClient<Blob>({ url: src, responseType: 'blob' }).then(res => res.data)

      forceDownload(window.URL.createObjectURL(response), filename).then(url => window.URL.revokeObjectURL(url))
    }
  }

  return (
    <div className='flex flex-col gap-2 cursor-pointer'>
      <div
        data-testid='file'
        className={cn(
          `flex items-center gap-5 max-w-full w-fit rounded-base transition-colors
          bg-border hover:bg-gray-quaternary active:bg-gray py-3 px-5`,
          className
        )}
        onClick={() => downloadResource(file.fullPath, file.originalName)}
      >
        {onView && (
          <Button variant='icon' onClick={() => onView(file)}>
            <OpenEye className='stroke-blue-gray' />
          </Button>
        )}
        {isLoading ? (
          <>
            <Loading data-testid='file-preloader' className='mr-5 w-7 h-7 fill-text-secondary animate-spin shrink-0' />
            <h4 className='text-text-secondary'>{t('File loading')}...</h4>
          </>
        ) : (
          <>
            <h4 className={cn('text-black truncate max-w-[185px]', fileNameClassName)}>
              {getFileNameWithoutExtension(file.originalName)}
            </h4>
            {showExtension && (
              <h4 className='text-black'>
                <span className='text-text-secondary h4'> .{fileExtension}</span>
              </h4>
            )}
            {!isSaved && onRemove && (
              <Button
                data-testId='file-delete-button'
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  onRemove(file)
                }}
                className={removeButtonClassName}
                color='secondary'
                variant='text'
              >
                <h3>{t('Delete')}</h3>
              </Button>
            )}
          </>
        )}
      </div>
      {extraContent}
    </div>
  )
}
