import React from 'react'
import pureRender from 'utils/pure-render'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import Form from 'components/form'

import './style.css'

const Grid = ({ className, operations, search, ...tableProps }) => {
  let cls = 'component-grid'
  if (className) {
    cls += ' ' + className
  }

  if (search && search.items.length) {
    search.items.push({
      id: '__opeation',
      col: {
        labelCol: { span: 0 }
      },
      element: <Button type="primary" htmlType="submit">搜索</Button>
    })
  }

  return (
    <div className={cls}>
      <div className="grid-header clearfix">
        <div className="grid-operation">
          {
            // 操作按钮
            operations && operations.map((opera, index) =>
              <Button key={index} className="grid-operation-btn" type={opera.type || 'primary'} disabled={opera.disabled} onClick={opera.handleClick}>{opera.title}</Button>
            )
          }
        </div>
        {
          // 搜索框
          search && <Form className="grid-search" layout="inline" {...search} />
        }
      </div>

      <Table bordered {...tableProps} />
    </div>
  )
}

Grid.propTypes = {
  className: PropTypes.string,
  operations: PropTypes.array,
  search: PropTypes.object
}

export default pureRender(Grid)
