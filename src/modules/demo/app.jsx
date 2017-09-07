import React from 'react'
import autobind from 'autobind-decorator'

import Base from 'components/base'
// import Base from './base'
// import Grid from 'components/grid'
import Grid from 'opiece-react-components/lib/grid'

import { Input } from 'antd'

// 引入调用接口需要的模块
import request from 'utils/x-request'
import { APP_RES } from 'utils/config'
import { GET_DEMO_LIST } from 'utils/apis'

export default class Demo extends Base {
  // 构造函数，不需要类构造之前做的初始化数据时，可以不写
  // constructor (props) {
  //   super(props)
  //
  //   this.state = {
  //     data: {}
  //   }
  // }

  /**
   * state
   */
  state = {
    data: {}
  }

  /**
   * 自定义函数 func1，func2，func3
   * 打印 this.state
   */
  handleFunc1 = autobind(() => {
    console.log('handleFunc1', this.state, this.vars)
  })

  // 同上,统一按此写法
  @autobind
  handleFunc2 () {
    console.log('handleFunc2', this.state, this.vars)
  }

  // 没有使用 autobind，方法中的 this，则不一定为 class 本身
  handleFunc3 = function () {
    console.log('handleFunc3', this.state, this.vars)
  }.bind(this)

  /**
   * 生命周期函数
   */
  componentWillMount () {
    console.log('组件将要挂载到DOM中')
    request(`${APP_RES.base}${GET_DEMO_LIST}`, {
      method: 'GET'
    }).then(data => {
      this.setState({
        // 等价写法(data: data)，对象中 key 和值名称相同时，可以这样简写
        data
      })
    })
  }

  componentDidMount () {
    console.log('组件挂载到DOM完成了')
  }

  componentWillUpdate () {
    console.log('组件将要更新')
  }

  componentDidUpdate () {
    console.log('组件更新完成了')
  }

  componentWillUnmount () {
    console.log('组件将要销毁')
  }

  componentWillReceiveProps (nextProps, props) {
    console.log('组件收到新的参数了')
  }

  columns = [{
    title: 'ID',
    dataIndex: 'id'
  }, {
    title: '名称',
    dataIndex: 'title'
  }, {
    title: '内容',
    dataIndex: 'content'
  }]

  searchItems = [{
    label: 'ID',
    id: 'id',
    col: {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    },
    element: <Input placeholder="请输入Id" />
  }, {
    label: '名称',
    id: 'title',
    col: {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    },
    element: <Input placeholder="请输入名称" />
  }]

  render () {
    // const data = this.state.data
    const { data } = this.state
    // items 默认值为 []
    const { items = [] } = data

    return (
      <div id="ui-demo">
        {/* Grid 组件增加了 operations 和 search 参数，其它参数仍参考 antd 的 table 组件 */}
        <Grid
          columns={this.columns}
          rowKey={row => row.id}
          dataSource={items}
          operations={[{
            title: 'func1',
            handleClick: this.handleFunc1
          }, {
            title: 'func2',
            handleClick: this.handleFunc2
          }, {
            title: 'func3',
            handleClick: this.handleFunc3
          }]}
          search={{
            items: this.searchItems,
            formData: { id: 123 },
            handleSubmit: this.handleFunc1
          }} />
      </div>
    )
  }
}
