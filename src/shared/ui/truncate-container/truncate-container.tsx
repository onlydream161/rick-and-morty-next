import { useRef, useEffect, useState } from 'react'
import { FCWithClassName, Nullable } from '@/shared/@types'
import { Tooltip } from '../tooltip'
import cn from 'classnames'
export interface TrancateContainerProps {
  maxWidth: number
  children: string
  childrenClassName?: string
}

export const TrancateContainer: FCWithClassName<TrancateContainerProps> = ({
  children,
  className,
  maxWidth,
  childrenClassName = '',
}) => {
  const ref = useRef<Nullable<HTMLDivElement>>(null)

  const [isTrancated, setIsTrancated] = useState(false)

  useEffect(() => {
    if (ref.current) {
      const { current: el } = ref
      const styles = getComputedStyle(el)
      const widthEl = parseFloat(styles.width)
      const ctx = document.createElement('canvas').getContext('2d')
      if (ctx) {
        ctx.font = `${styles.fontSize} ${styles.fontFamily}`
        const text = ctx.measureText(el.innerText)
        if (text.width > widthEl) setIsTrancated(true)
      }
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      <Tooltip isActive={isTrancated} label={children}>
        <div className={cn('truncate', childrenClassName)} style={{ maxWidth: maxWidth + 'px' }}>
          {children}
        </div>
      </Tooltip>
    </div>
  )
}
