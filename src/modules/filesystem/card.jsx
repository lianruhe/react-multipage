import React from 'react'
import PropTypes from 'prop-types'

import { Card, Checkbox, Icon, Row } from 'antd'

export default class FileCard extends React.Component {
  static propTypes = {
    dataList: PropTypes.array.isRequired,
    checked: PropTypes.object,
    checkItem: PropTypes.func,
    getDataList: PropTypes.func
  }

  render () {
    const { dataList, checkItem, checked, getDataList } = this.props
    return (
      <Card
        bordered={false}
        title={<Checkbox>全选</Checkbox>}
        noHovering >
        {
          dataList.map((item, index) => {
            const type = index > 10 ? 'file' : 'folder'
            const isChecked = !!checked[item.id]
            return (<Card.Grid
              key={index}
              className={`card ${isChecked ? 'card-checked' : 'card-uncheck'}`}
              onDoubleClick={() => { getDataList(item); console.log(type, item) }}>
              <Icon type="check-circle" className="check-icon" onClick={() => checkItem(item)} />
              <Row>
                <Icon type={type} className={`${type}-icon`} />
              </Row>
              <Row>
                <a>{`${type}${index}`}</a>
              </Row>
            </Card.Grid>)
          })
        }
      </Card>
    )
  }
}
