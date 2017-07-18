import React from 'react'
import PropTypes from 'prop-types'
import { TreeSelect } from 'antd'
const TreeNode = TreeSelect.TreeNode

export default class JgTreeSelect extends React.Component {
  static propTypes = {
    jgtree: PropTypes.object.isRequired
  }

  render () {
    const loop = data => data.map(item => {
      const { swjgDm, swjgmc, children } = item
      if (children) {
        return <TreeNode title={swjgmc} value={swjgDm} key={swjgDm}>{loop(children)}</TreeNode>
      }
      return <TreeNode title={swjgmc} value={swjgDm} key={swjgDm} isLeaf />
    })

    const { jgtree, ...treeProps } = this.props
    const { jgTree } = jgtree || {}
    const { swjgDm, swjgmc, children } = jgTree || {}

    return (
      <TreeSelect dropdownStyle={{ maxHeight: '300px' }} {...treeProps}>
        {
          swjgDm && children ? <TreeNode title={swjgmc} value={swjgDm} key={swjgDm}>
            {loop(children)}
          </TreeNode> : null
        }
      </TreeSelect>
    )
  }
}
