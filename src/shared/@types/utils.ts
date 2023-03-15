import { FC, ReactElement } from 'react'

export type Nullable<T> = T | null

export type PropsWithClassName<T = unknown> = T & { className?: string }

export type FCWithClassName<T = unknown> = FC<PropsWithClassName<T>>

export type FCWithChildren<T = unknown> = FC<
  PropsWithClassName<T> & {
    children?: ReactElement
  }
>
