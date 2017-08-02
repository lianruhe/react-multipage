import React from 'react'
import cytoscape from 'cytoscape'
import cxtmenu from 'cytoscape-cxtmenu'
import edgehandles from 'cytoscape-edgehandles'
// import cydagre from 'cytoscape-dagre' 流程图的布局
// import cycola from 'cytoscape-cola' // 流程图的布局
// import navigator from 'cytoscape-navigator' // 不知道是什么

cxtmenu(cytoscape)
edgehandles(cytoscape)
// cydagre(cytoscape)
// cycola(cytoscape)
// navigator(cytoscape)

export default class Cytoscape extends React.Component {
  componentDidMount () {
    this.cy = cytoscape({
      container: this.refs.cytoscape,
      boxSelectionEnabled: false,
      autounselectify: true,
      layout: {
        name: 'cose',
        padding: 10
      },
      style: [{
        selector: 'node',
        css: {
          'shape': 'rectangle', // 'data(faveShape)',
          'width': 'mapData(weight, 40, 80, 20, 60)',
          'content': 'data(name)',
          'text-valign': 'center',
          'text-outline-width': 2,
          // 'text-outline-color': 'data(faveColor)',
          'background-color': 'data(faveColor)',
          'color': '#fff'
        }
      },
      {
        selector: ':selected',
        css: {
          'border-width': 3,
          'border-color': '#333'
        }
      },
      {
        selector: 'edge',
        css: {
          'curve-style': 'bezier',
          'opacity': 0.666,
          'width': 'mapData(strength, 70, 100, 2, 6)',
          'target-arrow-shape': 'triangle',
          'source-arrow-shape': 'circle',
          'line-color': 'data(faveColor)',
          'source-arrow-color': 'data(faveColor)',
          'target-arrow-color': 'data(faveColor)'
        }
      },
      // {
      //   selector: 'edge.questionable',
      //   css: {
      //     'line-style': 'dotted',
      //     'target-arrow-shape': 'diamond'
      //   }
      // },
      // {
      //   selector: '.faded',
      //   css: {
      //     'opacity': 0.25,
      //     'text-opacity': 0
      //   }
      // },

      // some style for the ext
      {
        selector: '.edgehandles-hover',
        css: {
          'background-color': 'red'
        }
      },
      {
        selector: '.edgehandles-source',
        css: {
          'border-width': 2,
          'border-color': 'red'
        }
      },
      {
        selector: '.edgehandles-target',
        css: {
          'border-width': 2,
          'border-color': 'red'
        }
      },
      {
        selector: '.edgehandles-preview, .edgehandles-ghost-edge',
        css: {
          'line-color': 'red',
          'target-arrow-color': 'red',
          'source-arrow-color': 'red'
        }
      }],
      elements: {
        nodes: [
          { data: { id: 'j', name: 'Jerry', weight: 65, faveColor: '#6FB1FC', faveShape: 'triangle' } },
          { data: { id: 'e', name: 'Elaine', weight: 45, faveColor: '#EDA1ED', faveShape: 'ellipse' } },
          { data: { id: 'k', name: 'Kramer', weight: 75, faveColor: '#86B342', faveShape: 'octagon' } },
          { data: { id: 'g', name: 'George', weight: 70, faveColor: '#F5A45D', faveShape: 'rectangle' } }
        ],
        edges: [
          { data: { source: 'j', target: 'e', faveColor: '#6FB1FC', strength: 90 } },
          // { data: { source: 'j', target: 'k', faveColor: '#6FB1FC', strength: 70 } },
          // { data: { source: 'j', target: 'g', faveColor: '#6FB1FC', strength: 80 } },

          { data: { source: 'e', target: 'j', faveColor: '#EDA1ED', strength: 95 } },
          // { data: { source: 'e', target: 'k', faveColor: '#EDA1ED', strength: 60 }, classes: 'questionable' },

          { data: { source: 'k', target: 'j', faveColor: '#86B342', strength: 100 } },
          // { data: { source: 'k', target: 'e', faveColor: '#86B342', strength: 100 } },
          // { data: { source: 'k', target: 'g', faveColor: '#86B342', strength: 100 } },

          { data: { source: 'g', target: 'j', faveColor: '#F5A45D', strength: 90 } }
        ]
      },

      ready: function () {
        // window.cy = this
        console.log('cytoscape ready!!')
      }
    })

    this.cy.cxtmenu({
      selector: 'node',
      commands: [{
        content: '<span class="fa fa-flash fa-2x">ID</span>',
        select: function (ele) {
          console.log(ele.id())
        }
      }, {
        content: '<span class="fa fa-star fa-2x">Name</span>',
        select: function (ele) {
          console.log(ele.data('name'))
        }
        // disabled: true
      }, {
        content: 'Position',
        select: function (ele) {
          console.log(ele.position())
        }
      }]
    })

    this.cy.edgehandles({
      toggleOffOnLeave: true,
      handleNodes: 'node',
      handleSize: 10,
      edgeType: function () {
        return 'flat'
      },
      complete: (sourceNode, targetNodes, addedEntities) => {
        // fired when edgehandles is done and entities are added
        console.log(sourceNode, targetNodes, addedEntities)
      }
    })
  }

  render () {
    return (
      <div>
        <div id="ui-cytoscape" ref="cytoscape" style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          left: 0,
          top: 0
        }} />
      </div>
    )
  }
}
