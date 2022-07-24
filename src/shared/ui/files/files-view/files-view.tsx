import React, { FC } from 'react'
import cn from 'classnames'
import { File, ImageFile } from '..'
import { useFormContext } from 'react-hook-form'
import { FileModel } from '@/shared/@types'
import { ALLOWED_IMAGES_EXT } from '@/shared/config'
import { getFileExtension } from '@/shared/helpers'

export interface FilesViewProps {
  name?: string
  files?: FileModel[]
  className?: string
}

export interface SortedFiles {
  images: FileModel[]
  files: FileModel[]
}

export const FilesView: FC<FilesViewProps> = ({ name, files, className = '' }) => {
  const methods = useFormContext()

  if (!files || !files.length) {
    return null
  }

  const sortedFiles = files.reduce(
    (acc, file) => {
      acc[ALLOWED_IMAGES_EXT.includes(getFileExtension(file).toUpperCase()) ? 'images' : 'files'].push(file)
      return acc
    },
    { images: [], files: [] } as SortedFiles
  )

  const onRemove = (file: FileModel) => {
    name &&
      methods?.setValue(
        name,
        methods.watch(name).filter((el: FileModel) => el.id !== file.id)
      )
  }

  return (
    <div
      className={cn('flex flex-col gap-base', {
        [className]: className,
      })}
    >
      {!!sortedFiles.images.length && (
        <div className='flex items-center gap-small'>
          {sortedFiles.images.map(image => (
            <ImageFile key={image.id} image={image} onRemove={onRemove} />
          ))}
        </div>
      )}
      {!!sortedFiles.files.length && (
        <div className={cn('flex flex-col gap-extra-small')}>
          {sortedFiles.files.map(file => (
            <File key={file.id} file={file} onRemove={onRemove} />
          ))}
        </div>
      )}
    </div>
  )
}
