import React from 'react'
import PropTypes from 'prop-types'
// import Base from 'components/base'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode

export default class RcTree extends React.Component {
  static propTypes = {
    treeData: PropTypes.array.isRequired,
    label: PropTypes.string,
    value: PropTypes.string
  }

  render () {
    const { treeData, label, value, ...props } = this.props

    const loop = data => data.map(item => {
      const title = item[label || 'label']
      const key = item[value || 'value']
      if (item.children) {
        return <TreeNode title={title} key={key} value={key}>{loop(item.children)}</TreeNode>
      }
      return <TreeNode title={title} key={key} value={key} isLeaf />
    })

    return (
      <Tree ref="tree" onSelect={this.onSelect} {...props}>
        { loop(treeData) }
      </Tree>
    )
  }
}
