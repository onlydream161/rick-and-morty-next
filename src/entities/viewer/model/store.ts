import { atom } from 'jotai'
import { User } from '@/entities/viewer'

export const userAtom = atom<User | undefined>(undefined)
