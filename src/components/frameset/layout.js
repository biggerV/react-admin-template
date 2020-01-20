import React from 'react';
import { Layout } from 'antd';
import { WIN } from 'src/utils/util.js'
import { Fheader, Fsidebar, Fcontent, Ftabs } from 'src/components/frameset'

class Flayout extends React.Component {

  state = {
    win: {
      height: WIN.height
    }
  }

  getWinSize = (e) => {
    WIN.width = e.target.innerWidth
    WIN.height = e.target.innerHeight
    this.setState({
      win: {
        height: WIN.height
      }
    })
  }

  componentDidMount() {
    window.addEventListener("resize", this.getWinSize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getWinSize)
  }

  render() {
    return (
      <Layout style={{ height: this.state.win.height + 'px' }}>
        <Fsidebar></Fsidebar>
        <Layout>
          <Fheader></Fheader>
          <Ftabs></Ftabs>
          <Fcontent></Fcontent>
        </Layout>
      </Layout >
    );
  }
}

export default Flayout;
