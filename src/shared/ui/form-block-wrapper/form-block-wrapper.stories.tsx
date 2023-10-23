import { Story, Meta } from '@storybook/react'
import { FormBlockWrapper, FormBlockWrapperProps } from './form-block-wrapper'
import { Input } from '@/shared/ui'
import { Form } from '@/shared/lib'

export default {
  title: 'Shared/FormBlockWrapper',
  component: FormBlockWrapper,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Заголовок блока',
    },
  },
  args: {
    fields: ['firstName', 'lastName', 'middleName'],
  },
} as Meta

const Template: Story<FormBlockWrapperProps> = args => (
  <Form onSubmit={console.warn}>
    <FormBlockWrapper {...args}>
      <div className='flex gap-x-2'>
        <Input name='firstName' label='Имя' />
        <Input name='lastName' label='Имя' />
        <Input name='middleName' label='Имя' />
      </div>
    </FormBlockWrapper>
  </Form>
)

export const Default = Template.bind({})
Default.args = {
  title: <h2>Заголовок блока</h2>,
}
