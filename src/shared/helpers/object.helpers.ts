import { LegacyRef, MutableRefObject, RefCallback } from 'react'

export const getDeepClone = <T>(data: T): T => JSON.parse(JSON.stringify(data))

export const getObjectWithoutEmptyProperty = <T extends Record<string, unknown>>(object?: T): Partial<T> =>
  object
    ? Object.keys(object).reduce((acc, key) => {
        const value = object[key]
        if (
          !value ||
          (Array.isArray(value) && !value.length) ||
          (typeof value === 'object' && !Object.keys(value!).length)
        ) {
          return acc
        }
        return { ...acc, [key]: value }
      }, {})
    : {}

export function mergeRefs<T = any>(refs: Array<MutableRefObject<T> | LegacyRef<T>>): RefCallback<T> {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        // eslint-disable-next-line
        ;(ref as MutableRefObject<T | null>).current = value
      }
    })
  }
}
