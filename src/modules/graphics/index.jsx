import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import 'styles/index.css'

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('app')

const render = () => {
  const App = require('./app')
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  // Developer Tools Setup
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }

  // Setup hot module replacement
  if (module.hot) {
    module.hot.accept('./app', () => {
      // 从DOM 中移除已经挂载的 React 组件 然后重装
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    })
  }
}

// ========================================================
// Go!
// ========================================================
render()
