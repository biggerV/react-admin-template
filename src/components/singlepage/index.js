import React from 'react';
import { Route, Switch } from 'react-router-dom'
import appRoutes from 'src/routes'

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

function renderRoute(theRoutes) {
  theRoutes.map((route, i) => {
    if (route.auth === false) {
      if (!route.routes) {
        allRoutes.push(theRoute(route))
      } else {
        renderRoute(route.routes)
      }
    }
    return null
  })
}

renderRoute(appRoutes)

class SPage extends React.Component {

  render() {
    console.log("no auth route", allRoutes)
    return (
      <Switch>
        {allRoutes}
      </Switch>
    )
  }

}

export default SPage
