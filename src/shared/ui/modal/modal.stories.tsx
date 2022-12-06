import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../button/button'
import { Modal, ModalProps } from './modal'

export default {
  title: 'Shared/Modal',
  component: Modal,
  args: {
    nativeClose: true,
  },
} as Meta

const Template: Story<ModalProps> = args => {
  const [isOpen, onToggle] = useState(false)
  return (
    <>
      <Button variant='primary' onClick={() => onToggle(true)}>
        Открыть
      </Button>
      <Modal {...args} isOpen={isOpen} onClose={() => onToggle(false)}>
        <div className='flex items-center justify-center w-40 h-40 bg-background-primary rounded-xl'>Test</div>
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const MaskClosable = Template.bind({})
MaskClosable.args = {
  maskClosable: true,
}
