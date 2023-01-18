import { ReactElement, useMemo, useState } from 'react'
import Arrow from '@/shared/assets/icons/common/tooltip-arrow.svg'
import {
  Side,
  offset,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
} from '@floating-ui/react-dom-interactions'
import { motion, AnimatePresence } from 'framer-motion'
import cn from 'classnames'
import { FC } from 'react'
import { mergeRefs } from '@/shared/helpers'

export interface TooltipProps {
  label: string
  placement?: Side
  isActive?: boolean
  className?: string
  labelClassName?: string
}

export const Tooltip: FC<TooltipProps & { children: ReactElement }> = ({
  children,
  label,
  placement = 'top',
  isActive = true,
  className = '',
  labelClassName = '',
}) => {
  const [open, setOpen] = useState(false)

  const { x, y, reference, floating, strategy, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(16), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { restMs: 40 }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ])

  const ref = useMemo(() => mergeRefs([reference, (children as any).ref]), [reference, children])

  return (
    <>
      <div {...getReferenceProps({ ref })}>{children}</div>
      <AnimatePresence>
        {isActive && open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            {...getFloatingProps({
              ref: floating,
              className: cn('flex items-center bg-lines px-small min-h-[34px] rounded-base z-[9999]', className),
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              },
            })}
          >
            <Arrow
              data-testid='tooltip-arrow'
              className={cn('absolute fill-lines pointer-events-none', {
                'bottom-0 left-1/2 -translate-x-1/2 translate-y-full rotate-180': placement === 'top',
                'top-0 left-1/2 -translate-x-1/2 -translate-y-full': placement === 'bottom',
                '-left-[10px] bottom-1/2 translate-y-1/2 -rotate-90': placement === 'right',
                '-right-[10px] bottom-1/2 translate-y-1/2 rotate-90': placement === 'left',
              })}
            />
            <h6 className={cn('text-white', labelClassName)}>{label}</h6>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
