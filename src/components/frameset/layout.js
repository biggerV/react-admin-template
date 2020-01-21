import React from 'react';
import { withRouter } from 'react-router'
import { Layout } from 'antd';
import { WIN } from 'src/utils/util.js'
import { Fheader, Fsidebar, Fcontent, Ftabs } from 'src/components/frameset'
import { homeRoute } from 'src/routes'

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
    const isHome = this.props.history.location.pathname === homeRoute.path
    const FtabsCp = !isHome && <Ftabs />
    return (
      <Layout style={{ height: this.state.win.height + 'px' }}>
        <Fsidebar></Fsidebar>
        <Layout>
          <Fheader></Fheader>
          {FtabsCp}
          <Fcontent></Fcontent>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Flayout);
