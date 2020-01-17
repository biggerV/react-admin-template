import Login from 'src/pages/login'
import Dashboard from 'src/pages/dashboard'
import { TablesNormal } from 'src/pages/tables'

const routes = [
  {
    title: "用户登录",
    name: "Login",
    path: "/login",
    exact: false,
    component: Login,
    auth: false
  },
  {
    title: "控制面板",
    name: "Dashboard",
    path: "/dashboard",
    exact: false,
    component: Dashboard,
    icon: "dashboard"
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
        path: "/tables/normal",
        component: TablesNormal
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

function findRouteByPathname(pathanme) {
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


export default routes

export {
  getFlatRoutes,
  findRouteByPathname
}
