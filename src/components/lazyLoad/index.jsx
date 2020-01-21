import React from 'react'

/**
 * 组件懒加载 高阶组件
 * @param {*} importComponent 需要懒加载的组件 ()=>import('path-to-component')
 */

function lazyLoad(importComponent) {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        icomponent: null
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState({
        icomponent: component
      })
    }

    render() {
      const C = this.state.icomponent
      return C ? <C {...this.props} /> : null
    }
  }

  return AsyncComponent
}

export default lazyLoad
