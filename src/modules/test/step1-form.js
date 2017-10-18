import React from 'react'
import PropTypes from 'prop-types'
import Form from 'opiece-react-components/lib/form'
import { Input, Upload, Button, Icon } from 'antd'

const { TextArea } = Input

export default class Step1 extends React.Component {
  static propTypes = {
    formData: PropTypes.object
  }

  constructor (props) {
    super(props)

    const { name, detail, file } = props.formData || {}
    this.state = {
      name,
      detail,
      file,
      uploading: false
    }
  }

  saveFormValues (file) {
    const values = this.stepComponent.props.form.getFieldsValue()
    const { name, detail } = values
    this.setState({
      name,
      detail,
      file
    })
  }

  render () {
    const { name, detail, file } = this.state
    const uploadProps = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.saveFormValues()
      },
      beforeUpload: (file) => {
        console.log(file)
        this.saveFormValues(file)
        return false
      },
      fileList: file ? [file] : []
    }

    const items = [{
      label: '任务名称',
      id: 'name',
      options: {
        rules: [{ required: true, message: 'Please select your country!' }],
        initialValue: name
      },
      col: {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
      },
      element: <Input placeholder="Username" />
    }, {
      label: '任务描述',
      id: 'detail',
      options: {
        rules: [{ required: true, message: 'Please input your Password!' }],
        initialValue: detail
      },
      col: {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
      },
      element: <TextArea rows={2} placeholder="Password" />
    }, {
      label: '文件上传',
      id: 'file',
      options: {
        rules: [{ required: true, message: 'Please input your Password!' }],
        initialValue: file
      },
      col: {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
      },
      element: <Upload {...uploadProps}>
        <Button>
          <Icon type="upload" /> 选择上传文件
        </Button>
      </Upload>
    }]
    return (
      <Form className="ui-step1-form"
        wrappedComponentRef={inst => { this.stepComponent = inst }}
        layout="horizontal"
        items={items} />
    )
  }
}
