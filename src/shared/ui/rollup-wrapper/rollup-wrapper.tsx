import { FCWithChildren } from '@/shared/@types'
import { motion } from 'framer-motion'
import { useRef } from 'react'

export interface RollupWrapperProps {
  isOpen: boolean
  defaultOpen?: boolean
}

export const RollupWrapper: FCWithChildren<RollupWrapperProps> = ({
  children,
  defaultOpen = true,
  isOpen,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const scrollHeight = ref.current?.scrollHeight

  return (
    <motion.div
      ref={ref}
      initial={defaultOpen ? { height: scrollHeight } : { height: 0, overflow: 'hidden', marginTop: 0 }}
      animate={{
        height: isOpen ? scrollHeight : 0,
        ...(!isOpen && { overflow: 'hidden' }),
        transitionEnd: isOpen ? { overflow: 'visible', height: 'max-content' } : { overflow: 'hidden', height: 0 },
      }}
      exit={{ overflow: 'visible' }}
      transition={{ type: 'just' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
