import { Story, Meta } from '@storybook/react'
import { Form, notify } from '@/shared/lib'
import { Upload, UploadProps } from './upload'
import { Button } from '@/shared/ui'

export default {
  // title: 'Shared/Upload',
  component: Upload,
  argTypes: {
    multiple: { control: 'boolean', defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
  },
} as Meta

const Template: Story<UploadProps> = args => (
  <Form
    onSubmit={() => {
      notify('Успешно')
    }}
  >
    <Upload {...args}>
      <Button>Upload</Button>
    </Upload>
  </Form>
)

export const Default = Template.bind({})
Default.args = {}
