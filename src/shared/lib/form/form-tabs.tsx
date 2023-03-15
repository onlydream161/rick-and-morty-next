import { FCWithClassName } from '@/shared/@types'
import { Tab } from '@headlessui/react'
import { Tab as CustomTab } from '@/shared/ui/tab'
import { FormMode, FORM_READ_MODE } from './lib'
import { Fragment, ReactElement, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@/shared/ui'
import AddIcon from '@/shared/assets/icons/common/add.svg'

type RenderProps = {
  index: number
}

export interface FormTabsProps {
  name: string
  tabName?: string | ((props: RenderProps) => string)
  mode?: FormMode
  appendBody?: Record<string, unknown>
  children?: ReactElement | ((props: RenderProps) => ReactElement)
}

export const FormTabs: FCWithClassName<FormTabsProps> = ({ children, name, tabName, mode, appendBody = {} }) => {
  const [currentIndex, setIndex] = useState(0)

  const { control } = useFormContext()
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

  const isReadMode = mode === FORM_READ_MODE

  return (
    <Tab.Group selectedIndex={currentIndex} onChange={e => setIndex(e)}>
      <Tab.List className='flex flex-wrap gap-4 mb-5'>
        {fields.map((field, index) => (
          <Tab key={field.id}>
            {({ selected }) => (
              <CustomTab
                active={selected}
                {...(fields.length > 1 &&
                  !isReadMode && {
                    onRemove: () => onRemove(index),
                  })}
              >
                {typeof tabName === 'function' ? tabName({ index }) : tabName}
              </CustomTab>
            )}
          </Tab>
        ))}
        {isReadMode || (
          <Button data-testid='add-tab' onClick={() => append(appendBody)} variant='border-icon' color='secondary'>
            <AddIcon className='stroke-currentColor' />
          </Button>
        )}
      </Tab.List>
      <Tab.Panels as={Fragment}>
        {fields.map((field, index) => (
          <Tab.Panel key={field.id} unmount={false} className='will-change-transform'>
            {typeof children === 'function' ? children({ index }) : children}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
