import { useTranslate } from '@/shared/lib'
import Image, { ImageProps } from 'next/image'
import { FC, useState } from 'react'
import cn from 'classnames'

export interface NextImageProps extends Omit<ImageProps, 'src'> {
  src?: string
}

// TODO: deviceSizes, когда будут breakpoint

// ВАЖНО, если не прокидываете width, height, то вы должны делать родителя position: relative, fixed, absolute
export const NextImage: FC<NextImageProps> = ({ src, width, height, className, onError, ...rest }) => {
  const { t } = useTranslate(['common'])
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div
        data-testid='image-no-photo'
        // Изменить в зависимости от дизайна проекта
        className={cn('flex items-center justify-center bg-background-primary w-full h-full text-border', className)}
        // Из-за JIT компилятора не получится всунуть в cn через tailwind
        style={{ width: width || '100%', height: height || '100%' }}
      >
        <h2>{t('noPhoto')}</h2>
      </div>
    )
  }

  return (
    <Image
      src={src}
      className={className}
      {...(width && height ? { width, height } : { layout: 'fill' })}
      quality={100}
      {...rest}
      onError={event => {
        setError(true)
        onError?.(event)
      }}
    />
  )
}
