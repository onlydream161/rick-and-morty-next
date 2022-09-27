import { Dayjs } from 'dayjs'
import { EventValue, RangeValue } from 'rc-picker/lib/interface'
import { SelectOption, TFunction } from '../@types'

export const setDateRange =
  (
    setStartDate: (value: EventValue<Dayjs> | undefined) => void,
    setEndDate: (value: EventValue<Dayjs> | undefined) => void
  ) =>
  (range: RangeValue<Dayjs>) => {
    setStartDate(range?.[0])
    setEndDate(range?.[1])
  }

export const getMonthSelectOptions = (t: TFunction): SelectOption[] => [
  { id: 1, label: t('january') },
  { id: 2, label: t('february') },
  { id: 3, label: t('march') },
  { id: 4, label: t('april') },
  { id: 5, label: t('may') },
  { id: 6, label: t('june') },
  { id: 7, label: t('july') },
  { id: 8, label: t('august') },
  { id: 9, label: t('september') },
  { id: 10, label: t('october') },
  { id: 11, label: t('november') },
  { id: 12, label: t('december') },
]
