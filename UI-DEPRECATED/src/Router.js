import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home'

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact  component={Home} />
    <Route path="/home" component={Home} />
  </Switch>
)

export default Router
