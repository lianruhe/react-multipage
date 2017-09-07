import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'antd'

export default class FileCard extends React.Component {
  static propTypes = {
    dataList: PropTypes.array.isRequired,
    checkList: PropTypes.array,
    checkItem: PropTypes.func,
    checkAllItems: PropTypes.func,
    getDataList: PropTypes.func
  }

  render () {
    const { dataList, checkItem, checkAllItems, checkList, getDataList } = this.props
    // const selectedRowKeys = Object.keys(checkList).filter(key => !!checkList.key)
    console.log(checkItem, checkList, getDataList)
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
        // size="middle"
        rowSelection={{
          selectedRowKeys: checkList,
          onSelect: checkItem,
          onSelectAll: checkAllItems
        }}
        pagination={false}
        rowKey={item => item.id}
        columns={columns}
        dataSource={dataList}
        onRowClick={checkItem}
        onRowDoubleClick={() => { console.log('doubleClick') }}
      />
    )
  }
}
