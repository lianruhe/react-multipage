import React from 'react'
import autobind from 'autobind-decorator'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
// import data from '../graphics/data.json'
import data from './diskdata.json'
// import listdata from './data-list.json'
import list2tree from 'opiece-utils/lib/list2tree'
// const diskData = './diskdata.json'
console.log(data)
const start = Date.now()
const treeData = list2tree(data)
console.log(treeData)
console.log(Date.now() - start)

export default class Graphics extends React.Component {
  getOtion () {
    // function colorMappingChange (value) {
    //   const levelOption = getLevelOption(value)
    //   chart.setOption({
    //     series: [{
    //       levels: levelOption
    //     }]
    //   })
    // }
    const formatUtil = echarts.format
    // function getLevelOption () {
    //   return [{
    //     itemStyle: {
    //       normal: {
    //         borderWidth: 0,
    //         gapWidth: 5
    //       }
    //     }
    //   }, {
    //     itemStyle: {
    //       normal: {
    //         gapWidth: 1
    //       }
    //     }
    //   }, {
    //     colorSaturation: [0.35, 0.5],
    //     itemStyle: {
    //       normal: {
    //         gapWidth: 1,
    //         borderColorSaturation: 0.6
    //       }
    //     }
    //   }]
    // }
    const option = {
      title: {
        text: '',
        left: 'center'
      },

      tooltip: {
        formatter: function (info) {
          const value = info.value
          const treePathInfo = info.treePathInfo
          const treePath = []

          for (let i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name)
          }

          return [
            '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
            'Table Count: ' + formatUtil.addCommas(value)
          ].join('')
        }
      },

      series: [{
        name: '磁盘使用情况',
        type: 'treemap',
        visibleMin: 1,
        leafDepth: 2,
        // label: {
        //   show: true,
        //   formatter: '{b}'
        // },
        colorSaturation: [0.3, 0.6],
        itemStyle: {
          normal: {
            borderColor: '#eee',
            borderWidth: 0,
            gapWidth: 2
          }
        },
        data: treeData
        // levels: getLevelOption(),
      //   levels: [
      //     {
      //       colorSaturation: [0.3, 0.6],
      //       itemStyle: {
      //         normal: {
      //           borderColor: '#555',
      //           borderWidth: 4,
      //           gapWidth: 4
      //         }
      //       }
      //     },
      //     {
      //       colorSaturation: [0.3, 0.6],
      //       itemStyle: {
      //         normal: {
      //           borderColorSaturation: 0.7,
      //           gapWidth: 2,
      //           borderWidth: 2
      //         }
      //       }
      //     },
      //     {
      //       colorSaturation: [0.3, 0.5],
      //       itemStyle: {
      //         normal: {
      //           borderColorSaturation: 0.6,
      //           gapWidth: 1
      //         }
      //       }
      //     },
      //     {
      //       colorSaturation: [0.3, 0.5]
      //     }
      //   ]
      }]
    }
    return option
  }

  handleClick () {
    console.log(this.echartObj)
    // this.echartObj.showLoading()
    // // setOption
    // const option = this.getOtion()
    // option.series[0].data.push({
    //   value: 21,
    //   dataTableid: null,
    //   parentId: null,
    //   name: 'test数据',
    //   id: 190921234,
    //   children: [{
    //     id: 190921235,
    //     value: 21,
    //     name: 'test',
    //     children: [{
    //       id: 190921236,
    //       value: 21,
    //       name: 'test-children'
    //     }, {
    //       id: 190921237,
    //       value: 21,
    //       name: 'test-children2'
    //     }]
    //   }]
    // })
    // this.echartObj.setOption(option)
    // // 定位到某个节点
    // this.echartObj._api.dispatchAction({
    //   type: 'treemapRootToNode',
    //   targetNodeId: 190921234
    // })
    // this.echartObj._api.dispatchAction({
    //   type: 'treemapZoomToNode',
    //   targetNodeId: 190921235
    // })
    // this.echartObj.hideLoading()
  }

  @autobind
  onChartClick (param, echart) {
    console.log(param, echart)
    echart.showLoading()
    // setOption
    // const option = this.getOtion()
    // option.series[0].data.push({
    //   value: 21,
    //   dataTableid: null,
    //   parentId: null,
    //   name: 'test数据',
    //   id: 190921234,
    //   children: [{
    //     id: 190921235,
    //     value: 21,
    //     name: 'test',
    //     children: [{
    //       id: 190921236,
    //       value: 21,
    //       name: 'test-children'
    //     }, {
    //       id: 190921237,
    //       value: 21,
    //       name: 'test-children2'
    //     }]
    //   }]
    // })
    // echart.setOption(option)
    // 定位到某个节点
    // echart._api.dispatchAction({
    //   type: 'treemapRootToNode',
    //   targetNodeId: 190921234
    // })
    // echart._api.dispatchAction({
    //   type: 'treemapZoomToNode',
    //   targetNodeId: 190921235
    // })
    echart.hideLoading()
  }

  render () {
    return (
      <div className="examples">
        <button onClick={() => this.handleClick()}>磁盘使用</button>
        <div className="parent">
          {/* <label> render a disk usage treemap. </label> */}
          <ReactEcharts
            option={this.getOtion()}
            style={{height: '500px', width: '100%'}}
            onChartReady={echartObj => {
              this.echartObj = echartObj
            }}
            onEvents={{
              click: this.onChartClick
            }}
            className="react_for_echarts" />
        </div>
      </div>
    )
  }
}
