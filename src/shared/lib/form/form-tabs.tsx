import { FCWithClassName } from '@/shared/@types'
import { Tab } from '@headlessui/react'
import { Tab as CustomTab } from '@/shared/ui/tab'
import { FormMode } from './lib'
import { Fragment, ReactElement, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@/shared/ui'
import { removeLastDot } from '@/shared/helpers'
import AddIcon from '@/shared/assets/icons/common/plus.svg'
import get from 'lodash/get'
import cn from 'classnames'

type RenderProps = {
  index: number
}

export interface FormTabsProps {
  name: string
  tabName?: string | ((props: RenderProps) => string | ReactElement)
  mode?: FormMode
  children?: ReactElement | ((props: RenderProps) => ReactElement)
  panelClassName?: string
  getAppendBody: () => Record<string, unknown>
  getCopyBody: (index: number) => Record<string, unknown>
}

export const FormTabs: FCWithClassName<FormTabsProps> = ({
  children,
  name,
  tabName,
  mode,
  getAppendBody,
  getCopyBody,
  panelClassName,
}) => {
  const [currentIndex, setIndex] = useState(0)

  const { control, formState } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  const onRemove = (index: number) => {
    if (index === fields.length - 1) {
      setIndex(index - 1)
    }
    if (index < currentIndex) {
      setIndex(prev => prev - 1)
    }
    remove(index)
  }

  const isReadMode = mode === FormMode.Read

  const copyTab = (currentIndex: number) => {
    append(getCopyBody(currentIndex))
    setIndex(fields.length)
  }

  return (
    <Tab.Group selectedIndex={currentIndex} onChange={e => setIndex(e)}>
      <Tab.List className='flex flex-wrap items-center gap-4 mb-5'>
        {fields.map((field, index) => (
          <Tab key={field.id} as={Fragment}>
            {({ selected }) => (
              <CustomTab
                active={selected}
                {...(!isReadMode && {
                  copyHandler: () => copyTab(index),
                })}
                {...(fields.length > 1 &&
                  !isReadMode && {
                    removeHandler: () => onRemove(index),
                  })}
                className={cn({
                  'text-red': !!get(formState.errors, `${removeLastDot(name)}.${index}`),
                })}
              >
                {typeof tabName === 'function' ? tabName({ index }) : tabName}
              </CustomTab>
            )}
          </Tab>
        ))}
        {isReadMode || (
          <Button
            data-testid='add-tab'
            onClick={() => {
              append(getAppendBody())
              setIndex(fields.length)
            }}
            variant='border-icon'
            color='secondary'
            className='p-2'
          >
            <AddIcon className='stroke-currentColor' />
          </Button>
        )}
      </Tab.List>
      <Tab.Panels as={Fragment}>
        {fields.map((field, index) => (
          <Tab.Panel key={field.id} unmount={true} className={cn('will-change-transform', panelClassName)}>
            {typeof children === 'function' ? children({ index }) : children}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
