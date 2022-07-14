import { Button } from '@/shared/ui'
import { Story, Meta } from '@storybook/react'
import { Form, notifySuccess } from '@/shared/lib'
import { Upload, UploadProps } from './upload'

export default {
  title: 'Shared/Upload',
  component: Upload,
} as Meta

const Template: Story<UploadProps> = args => (
  <Form
    onSubmit={() => {
      notifySuccess('Успешно')
    }}
  >
    <Upload {...args}>
      <Button>Upload</Button>
    </Upload>
  </Form>
)

export const Default = Template.bind({})
Default.args = {}
