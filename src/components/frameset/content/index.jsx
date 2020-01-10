import React from 'react';
import styles from './index.module.scss'
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom'
import appRoutes from 'src/routes'

const { Content } = Layout;

function createRoutes(appRoutes) {
  let allRoutes = [];

  function theRoute(route) {
    return (
      <Route
        key={route.name}
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} />
        )}
      />
    );
  }

  function createRoute(theRoutes) {
    theRoutes.map(route => {
      if (route.auth !== false) {
        if (!route.routes) {
          allRoutes.push(theRoute(route))
        } else {
          createRoute(route.routes)
        }
      }
      return null
    })
  }

  createRoute(appRoutes)

  return allRoutes
}

class Fcontent extends React.Component {

  render() {
    const routes = createRoutes(appRoutes)
    console.log("auth route", routes)
    return (
      <Content className={styles.content}>
        <Switch>
          {routes}
        </Switch>
      </Content>
    )
  }

}

export default Fcontent
