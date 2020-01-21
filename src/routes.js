// import Login from 'src/pages/login'
// import Dashboard from 'src/pages/dashboard'
// import { TablesNormal } from 'src/pages/tables'
import lazyLoad from 'src/components/lazyLoad'

const basePath = "/"

/**
 * 路由配置
 * {
 *  title: "",            // 必须 标题
    name: "",             // 必须 key
    path: "",             // 必须 路由
    exact: false,         // 是否完全匹配
    component: xx,        // 路由对应渲染的组件
    icon: "",             // 图标 侧栏显示
    home: true,           // 是否系统主页
    routes: []            // 子路由 会在侧栏显示出层级关系
 * }
 */
const routes = [
  {
    title: "用户登录",
    name: "Login",
    path: `${basePath}login`,
    exact: false,
    component: lazyLoad(() => import('src/pages/login')),
    auth: false
  },
  {
    title: "控制面板",
    name: "Dashboard",
    path: `${basePath}dashboard`,
    exact: false,
    component: lazyLoad(() => import('src/pages/dashboard')),
    icon: "dashboard",
    home: true
  },
  // {
  //   title: "列表页",
  //   name: "Tables",
  //   icon: "table",
  //   path: "/tables/normal",
  //   exact: false,
  //   component: TablesNormal
  // }
  {
    title: "列表页",
    name: "Tables",
    icon: "table",
    routes: [
      {
        title: "普通列表",
        name: "TablesNormal",
        path: `${basePath}tables/normal`,
        component: lazyLoad(() => import('src/pages/tables/normal')),
      }
    ]
  }
]

const getFlatRoutes = () => {
  const flats = []
  const findRoute = (iroutes) => {
    iroutes.map(item => {
      if (!item.routes) {
        flats.push(item)
      } else {
        findRoute(item.routes)
      }
      return null
    })
  }
  findRoute(routes)
  return flats
}

const findRouteByPathname = (pathanme) => {
  let route = null
  getFlatRoutes(routes).some(item => {
    if (item.path === pathanme) {
      route = item
      return true
    }
    return null
  })
  return route
}

const getHomeRoute = () => {
  let route = null
  getFlatRoutes().some(item => {
    if (item.home) {
      route = item
      return true
    }
    return false
  })
  return route
}
const homeRoute = getHomeRoute()

export default routes

export {
  basePath,
  getFlatRoutes,
  findRouteByPathname,
  homeRoute
}
