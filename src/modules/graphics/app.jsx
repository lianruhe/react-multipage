import createG2 from 'g2-react'
import { Stat } from 'g2'
import React from 'react'
import data from './data.json'
console.log(data)

function findNode (name, nodes) {
  let rst = null
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (node.name === name) {
      rst = node
    }
    if (!rst && node.children) {
      rst = findNode(name, node.children)
    }
    if (rst) {
      break
    }
  }
  return rst
}

const Chart = createG2(chart => {
  chart.tooltip({
    map: {
      // title: 'name',
      value: 'value'
    }
  })
  chart.axis(false)
  chart.legend(false)
  chart.polygon().position(Stat.treemap('1*value'))
    .color('name')
    .label('name')
    .style({
      stroke: '#fff',
      lineWidth: 1
    })
  chart.render()
  let expanded = false
  chart.on('plotclick', ev => {
    const point = ev.data
    if (point) {
      const name = point._origin.name
      const node = findNode(name, data)
      let nodes
      if (!expanded) {
        if (node.children) {
          nodes = node.children
        } else {
          nodes = [node]
        }
        chart.clear()
        chart.source(nodes)
        chart.polygon().position(Stat.treemap('1*value')).color(point.color)
          .label('name', {
            offset: -2,
            label: {
              fontSize: 10
            }
          })
          .style({
            stroke: '#fff',
            lineWidth: 1
          })
        chart.render()
        expanded = true
      } else {
        chart.clear()
        chart.source(data)
        chart.polygon().position(Stat.treemap('1*value')).color('name')
          .label('name', {
            label: {
              fontSize: 12
            }
          })
          .style({
            stroke: '#fff',
            lineWidth: 1
          })
        chart.render()
        expanded = false
      }
    }
  })
})

export default class Graphics extends React.Component {
  state = {
    // data: [],
    forceFit: true,
    width: 500,
    height: 450,
    plotCfg: {
      margin: 0
    }
  }

  render () {
    return (
      <div>
        <Chart
          data={data}
          width={this.state.width}
          height={this.state.height}
          plotCfg={this.state.plotCfg}
          forceFit={this.state.forceFit} />
      </div>
    )
  }
}
