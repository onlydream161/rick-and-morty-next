import { PropsWithClassName } from '@/shared/@types'
import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../button/button'
import { Modal, ModalProps } from './modal'

export default {
  title: 'Shared/Modal',
  component: Modal,
  argTypes: {
    maskClosable: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<PropsWithClassName<ModalProps>> = args => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button variant='outlined' onClick={() => setIsOpen(true)}>
        Открыть
      </Button>
      <Modal
        className='flex flex-col items-center text-center max-w-lg'
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <>
          <h2 className='text-black mb-5'>Заголовок модального окна</h2>
          <h4 className='text-text mb-10'>
            Информация, описывающая содержимое модального окна или помогающая заполнить определенные данные
          </h4>
          <div className='grid grid-cols-2 text-center gap-5 w-full'>
            <Button variant='outlined' color='secondary' size='large' fullWidth onClick={() => setIsOpen(false)}>
              <h3>Действие 2</h3>
            </Button>
            <Button variant='contained' fullWidth>
              <h3>Действие 1</h3>
            </Button>
          </div>
        </>
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
