import { Story, Meta } from '@storybook/react'
import { Button, ButtonProps } from './button'
import CloseIcon from '@/shared/assets/icons/common/open-eye.svg'
import OpenEyeIcon from '@/shared/assets/icons/common/open-eye.svg'

export default {
  title: 'Shared/Button',
  component: Button,
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    fullWidth: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args}></Button>

export const Default = Template.bind({})
Default.args = {
  children: <h3>Кнопка</h3>,
}
Default.argTypes = {
  variant: {
    control: 'select',
    options: ['contained', 'outlined', 'text'],
    defaultValue: 'contained',
  },
}

export const Icon = Template.bind({})
Icon.args = {
  children: <OpenEyeIcon className='stroke-currentColor' />,
  variant: 'icon',
}
Icon.argTypes = {
  variant: {
    table: {
      disable: true,
    },
  },
}

export const BorderIcon = Template.bind({})
BorderIcon.args = {
  children: <CloseIcon className='stroke-currentColor' />,
  variant: 'border-icon',
}
BorderIcon.argTypes = {
  variant: {
    table: {
      disable: true,
    },
  },
}
