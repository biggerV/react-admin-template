import React from 'react';
import styles from './index.module.scss'
import { Layout, Menu, Icon } from 'antd';
import eventhub from '../events.js'
import appRoutes from 'src/routes'
import { withRouter, matchPath } from "react-router";

const { Sider } = Layout;
const { SubMenu } = Menu;

const createMenus = function (appRoutes) {
  const menuItemsVm = []
  const flatRoutes = []

  const createMenuItem = function (route, parent = null) {
    flatRoutes.push({ ...route, parent })
    let iconVm = null
    if (route.icon) {
      iconVm = <Icon type={route.icon} />
    }
    return (
      <Menu.Item key={route.name}>
        {iconVm}
        <span>{route.title}</span>
      </Menu.Item>
    )
  }

  const createSubMenu = function (route) {
    const children = []
    route.routes.map(item => {
      children.push(createMenuItem(item, route.name))
      return null
    })
    menuItemsVm.push(
      <SubMenu
        key={route.name}
        title={
          <>
            <Icon type={route.icon} />
            <span>
              {route.title}
            </span>
          </>
        }
      >{children}</SubMenu>
    )
  }

  const createMenuItems = function (routesArr) {
    routesArr.map(item => {
      if (item.auth !== false) {
        if (!item.routes) {
          menuItemsVm.push(createMenuItem(item))
        } else {
          createSubMenu(item)
        }
      }
      return null
    })
  }

  createMenuItems(appRoutes)

  return { menuItemsVm, flatRoutes }
}

const { menuItemsVm, flatRoutes } = createMenus(appRoutes)

class Fsidebar extends React.Component {

  state = {
    collapsed: false,
    selectedKey: "",
    openKey: ""
  }

  //--- eventhub的正确用法 ->>>>
  // 在开发模式因为启用了热更新，修改了组件会重新渲染
  // 所以要在组件渲染时监听事件，并在组件销毁同时销毁监听事件
  // 否则调用监听事件内的setState会报错，因为这个this是旧组件的实例
  // 不及时销毁会有内存泄露的风险（每次修改组件重新渲染都会在内存中增加一个组件实例而得不到释放）
  componentDidMount() {
    eventhub.$on("collapsed", val => {
      this.setState({
        collapsed: val
      })
    })

    this.matchMenuPath()
  }

  componentWillUnmount() {
    eventhub.$destroy("collapsed")
  }
  //---------------------<<<<

  handleMenuClick = ({ key }) => {
    flatRoutes.some(item => {
      if (item.name === key) {
        this.setState({
          selectedKey: item.name
        })
        this.props.history.push({
          pathname: item.path
        })
      }
      return null
    })
  }

  matchMenuPath() {
    const pathname = window.location.pathname
    flatRoutes.some(item => {
      const match = matchPath(pathname, {
        path: item.path,
        exact: item.exact,
        strict: false
      });
      if (match) {
        this.setState({
          selectedKey: item.name,
          openKey: item.parent
        })
      }
      return !!match
    })
  }

  render() {
    const selectedKeys = this.state.selectedKey ? [this.state.selectedKey] : []
    const openKeys = [this.state.openKey]

    if (this.state.openKey === "") {
      return <></>
    }

    return (
      <Sider trigger={null} collapsible collapsed={this.state.collapsed} className="Fsider" collapsedWidth="50">
        <div className={styles.logo} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
          onClick={this.handleMenuClick}
        >
          {menuItemsVm}
        </Menu>
      </Sider>
    )
  }

}

export default withRouter(Fsidebar)
