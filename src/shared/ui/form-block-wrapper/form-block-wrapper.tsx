import { FCWithChildren } from '@/shared/@types'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { motion } from 'framer-motion'
import { useFormErrors } from '@/shared/hooks'
import { useFormContext } from 'react-hook-form'
import cn from 'classnames'

export interface FormBlockWrapperProps {
  title?: ReactElement
  defaultOpen?: boolean
  fields?: string[]
  childrenClassName?: string
  getDisclosureButtonText?: (isOpen: boolean) => string
  position?: Position
  buttonClassName?: string
}

type Position = 'top' | 'bottom'

export const FormBlockWrapper: FCWithChildren<FormBlockWrapperProps> = ({
  title,
  className,
  children,
  defaultOpen = true,
  fields,
  childrenClassName,
  getDisclosureButtonText,
  position = 'top',
  buttonClassName,
}) => {
  const { t } = useTranslate(['common'])

  const ref = useRef<HTMLDivElement>(null)

  const { formState } = useFormContext() || { formState: {} }
  const { errors } = formState
  const { fieldsHasError } = useFormErrors(errors) || {}

  const [open, setOpen] = useState(defaultOpen)

  const isNeedMarginTop = (title || fields) && children
  const scrollHeight = ref.current?.scrollHeight

  useEffect(() => {
    if (fieldsHasError?.(fields)) {
      setOpen(true)
    }
  }, [fields, fieldsHasError])

  const DisclosureButton = () => (
    <Button
      className={cn('flex-shrink-0', buttonClassName)}
      variant='text'
      color='secondary'
      onClick={() => setOpen(prev => !prev)}
    >
      <h3>{getDisclosureButtonText?.(open) || t(open ? 'Rollup' : 'Open')}</h3>
    </Button>
  )

  return (
    <div className={cn('bg-gray-tertiary w-full p-large flex flex-col rounded-base', className)}>
      {(title || fields) && (
        <div className={'flex items-center justify-between'}>
          {title && title}
          {fields && position === 'top' && <DisclosureButton />}
        </div>
      )}
      <motion.div
        ref={ref}
        initial={
          defaultOpen
            ? { height: scrollHeight, marginTop: isNeedMarginTop ? '20px' : 0 }
            : { height: 0, overflow: 'hidden', marginTop: 0 }
        }
        animate={{
          height: open ? scrollHeight : 0,
          ...(!open && { overflow: 'hidden' }),
          marginTop: open && isNeedMarginTop ? '20px' : 0,
          transitionEnd: open ? { overflow: 'visible', height: 'max-content' } : { overflow: 'hidden', height: 0 },
        }}
        exit={{ overflow: 'visible' }}
        transition={{ type: 'just' }}
        className={childrenClassName}
      >
        {children}
      </motion.div>
      {fields && position === 'bottom' && <DisclosureButton />}
    </div>
  )
}
