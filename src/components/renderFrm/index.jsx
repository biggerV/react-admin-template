import React from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import Flayout from 'src/components/frameset/layout'
import Spage from 'src/components/singlepage'
import { findRouteByPathname } from 'src/routes'
import NotFound from 'src/components/notfound'
import { authToken } from 'src/utils/util.js'
import { message } from 'antd'

const NotFoundTip = (
  <NotFound style={
    {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: '-100px',
      marginLeft: '-100px'
    }
  }></NotFound>
)

const loginTip = function () {
  message.warning("登录已过期，请重新登陆！")
}

class RenderFrm extends React.Component {

  render() {
    const history = this.props.history
    const location = history.location
    const curRoute = findRouteByPathname(location.pathname)
    const isLogin = authToken.get()
    console.log("location", location)

    if (location.pathname === "/") {
      return (
        <Redirect to={{
          pathname: '/dashboard'
        }}></Redirect>
      )
    }

    if (!curRoute) {
      return <NotFoundTip></NotFoundTip>
    }

    if (curRoute.auth !== false && !isLogin) {
      return (
        <Redirect to={{
          pathname: '/login',
          state: {
            redirectTo: curRoute.path
          }
        }}>{loginTip()}</Redirect>
      )
    }

    if (curRoute.auth !== false && isLogin) {
      return <Flayout></Flayout>
    } else {
      return <Spage></Spage>
    }
  }
}

export default withRouter(RenderFrm)
