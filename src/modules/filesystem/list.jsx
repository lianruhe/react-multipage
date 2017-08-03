import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'antd'

export default class FileCard extends React.Component {
  static propTypes = {
    dataList: PropTypes.array.isRequired,
    checked: PropTypes.object,
    checkItem: PropTypes.func,
    getDataList: PropTypes.func
  }

  render () {
    const { dataList, checkItem, checked, getDataList } = this.props
    console.log(checkItem, checked, getDataList)
    const columns = [{
      title: '文件名',
      dataIndex: 'id'
    }, {
      title: '大小',
      dataIndex: 'age'
    }, {
      title: '描述',
      dataIndex: 'content'
    }]
    return (
      <Table
        className="file-list"
        size="middle"
        pagination={false}
        rowKey={item => item.id}
        columns={columns}
        dataSource={dataList} />
    )
  }
}
