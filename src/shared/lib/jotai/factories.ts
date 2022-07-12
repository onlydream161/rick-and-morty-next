import { SetStateAction, WritableAtom } from 'jotai'
import { atomWithHash, RESET } from 'jotai/utils'
import { Router } from 'next/router'

export interface FilterAtomParams {
  name: string
  initialValue: unknown
}

export interface AtomWithHashOptions<Value> {
  serialize?: (val: Value) => string
  deserialize?: (str: string) => Value
  delayInit?: boolean
  replaceState?: boolean
  subscribe?: (callback: () => void) => () => void
}

export const atomWithHashFactory = <Value>(
  key: string,
  initialValue: Value,
  options?: AtomWithHashOptions<Value>
): WritableAtom<Value, SetStateAction<Value> | typeof RESET> =>
  atomWithHash(
    key,
    initialValue,
    Object.assign(
      {
        delayInit: true,
        subscribe: callback => {
          Router.events.on('routeChangeComplete', callback)
          window.addEventListener('hashchange', callback)
          return () => {
            Router.events.off('routeChangeComplete', callback)
            window.removeEventListener('hashchange', callback)
          }
        },
      } as AtomWithHashOptions<Value>,
      options
    )
  )

export const filterAtomsFactory = <Filters extends Record<string, Filters[keyof Filters]>>(filters: Filters) =>
  Object.fromEntries(Object.entries(filters).map(([key, value]) => [key, atomWithHashFactory(key, value)])) as {
    [key in keyof Filters]: WritableAtom<Filters[key], SetStateAction<Filters[key]> | typeof RESET>
  }
