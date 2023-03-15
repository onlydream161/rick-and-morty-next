import { atom } from 'jotai'
import { User } from '../lib'

export const viewerAtom = atom<User | undefined>(undefined)
