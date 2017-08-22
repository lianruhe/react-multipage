import React from 'react'
import PropTypes from 'prop-types'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'

import { Card, Checkbox, Icon, Row } from 'antd'

const CONTEXTMENUID = 'FILE_CONTEXT_MENU_ID'

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
    return (
      <Card
        bordered={false}
        title={<Checkbox
          defaultChecked={checkList.length >= dataList.length}
          onChange={e => checkAllItems(e.target.checked)}>全选</Checkbox>}
        noHovering >
        {
          dataList.map((item, index) => {
            const isFile = index > 10
            const type = isFile ? 'file' : 'folder'
            const isChecked = checkList.indexOf(item.id) !== -1
            const cardItem = (<Card.Grid
              key={index}
              className={`card ${type}-card ${isChecked ? 'card-checked' : 'card-uncheck'}`}
              onDoubleClick={() => { !isFile && getDataList(item) }}>
              {isFile && <Icon type="check-circle" className="check-icon" />}
              <Row>
                <Icon type={type} className={`${type}-icon`} />
              </Row>
              <Row>
                <a>{`${type}${index}`}</a>
              </Row>
            </Card.Grid>)

            return (isFile
              ? <div key={index} onClick={() => checkItem(item)}>
                <ContextMenuTrigger id={CONTEXTMENUID}>
                  { cardItem }
                </ContextMenuTrigger>
                <ContextMenu id={CONTEXTMENUID}>
                  <MenuItem onClick={this.handleClick} data={{ item: 'item 1' }}>描述</MenuItem>
                  <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>字段</MenuItem>
                  <MenuItem divider />
                  <MenuItem onClick={this.handleClick} data={{ item: 'item 3' }}>预览</MenuItem>
                </ContextMenu>
              </div>
              : <div key={index}>
                { cardItem }
              </div>)
          })
        }
      </Card>
    )
  }
}
