import { FC, PropsWithChildren } from 'react'

export type FCWithChildren<T = unknown> = FC<PropsWithChildren<T>>

export type Nullable<T> = T | null
