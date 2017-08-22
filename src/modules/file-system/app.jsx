import React from 'react'
import autobind from 'autobind-decorator'

import Base from 'components/base'
import FileCard from './card'
import FileList from './list'

import { Button, Layout, Row, Col, Input, Icon, Breadcrumb } from 'antd'

// 引入调用接口需要的模块
import request from 'utils/x-request'
import { APP_RES } from 'utils/config'
import { GET_DEMO_LIST } from 'utils/apis'
import './style.css'

const { Header, Content } = Layout

export default class FileSystem extends Base {
  state = {
    style: 'card',
    dataList: [],
    checkList: []
  }

  @autobind
  switchStyle () {
    const { style } = this.state
    this.setState({
      style: style === 'list' ? 'card' : 'list'
    })
  }

  getList () {
    request(`${APP_RES.base}${GET_DEMO_LIST}`, {
      method: 'GET'
    }).then(data => {
      this.setState({
        dataList: data.items || []
      })
    })
  }

  @autobind
  checkItem (item) {
    if (!item.id) {
      return
    }
    const { checkList } = this.state

    const index = checkList.indexOf(item.id)
    if (index === -1) {
      checkList.push(item.id)
    } else {
      checkList.splice(index, 1)
    }

    this.setState({
      checkList
    }, () => {
      this.forceUpdate()
    })
  }

  @autobind
  checkAllItems (selected) {
    // 全部勾选
    let checkList = []
    if (selected) {
      checkList = this.state.dataList.map(item => item.id)
    }
    this.setState({
      checkList
    }, () => {
      this.forceUpdate()
    })
  }

  @autobind
  getDataList (item) {
    this.setState({
      dataList: [{
        id: 1
      }, {
        id: 2
      }, {
        id: 3
      }]
    })
  }

  componentWillMount () {
    this.getList()
  }

  render () {
    const { style, dataList, checkList } = this.state
    const Com = style === 'list' ? FileList : FileCard
    return (
      <Layout id="ui-filesystem">
        <Breadcrumb separator=">" className="bread">
          {/* <a className="ant-breadcrumb-link">返回上一级</a>
          <span className="ant-breadcrumb-separator">|</span> */}
          <Breadcrumb.Item href="">全部文件</Breadcrumb.Item>
          <Breadcrumb.Item>文件夹1</Breadcrumb.Item>
        </Breadcrumb>
        <Header id="header">
          <Row>
            <Col span={18}>
              <Button type="primary">上传</Button>
            </Col>
            <Col span={6} className="right">
              <Input.Search
                className="search"
                placeholder="搜索您的文件"
                style={{ width: 160 }}
                onSearch={value => console.log(value)}
              />
              <Icon
                className="style-icon"
                type={style === 'list' ? 'bars' : 'appstore-o'}
                onClick={this.switchStyle}
              />
            </Col>
          </Row>
        </Header>

        <Content id="content">
          <Com
            dataList={dataList}
            checkList={checkList}
            checkItem={this.checkItem}
            checkAllItems={this.checkAllItems}
            getDataList={this.getDataList} />
        </Content>
      </Layout>
    )
  }
}
