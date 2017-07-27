import React from 'react'
// import Base from 'components/base'
import { Steps, Button, message, Icon, Row, Col } from 'antd'
import FormStep1 from './step1-form'
import 'styles/app/test.css'

const Step = Steps.Step

const steps = [{
  title: '文件上传',
  icon: 'upload',
  content: 'First-content'
}, {
  title: '文件校验',
  icon: 'exception',
  content: 'Second-content'
}, {
  title: '完成',
  icon: 'check-circle-o',
  content: 'Last-content'
}]

export default class Test extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formStep1: {},
      current: 0
    }
  }

  next () {
    const { current } = this.state
    const component = `formStep${current + 1}`
    this.refs[component].stepComponent.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.setState({
          [component]: values,
          current: current + 1
        })
      }
    })
  }

  prev () {
    const current = this.state.current - 1
    this.setState({ current })
  }

  render () {
    const { current, formStep1 } = this.state
    return (
      <div className="ui-test">
        <div className="ui-wrapper" id="steps-wrapper">
          <Steps className="steps" current={current} status="process">
            {steps.map(item => <Step key={item.title} title={item.title} icon={<Icon type={item.icon} />} />)}
          </Steps>
        </div>
        <div className="ui-wrapper">
          { current === 0 && <FormStep1 ref="formStep1" formData={formStep1} />}
          { current !== 0 && <div className="content">{steps[current].content}</div>}
          <Row className="action">
            <Col span={8} offset={16}>
              {
                this.state.current > 0 &&
                <Button style={{ marginRight: 10 }} onClick={() => this.prev()}>
                  上一步
                </Button>
              }
              {
                this.state.current < steps.length - 1 &&
                <Button type="primary" onClick={() => this.next()}>下一步</Button>
              }
              {
                this.state.current === steps.length - 1 &&
                <Button type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
              }
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
