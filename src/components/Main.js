import { Switch, Route, Redirect } from 'react-router-dom'
import HSLBasicContainer from '../pages/color-generation/HSL-basic/HSLBasicContainer'
import Custom from '../pages/color-generation/Custom/Custom'
import Picture from '../pages/color-generation/Picture/Picture'
//import Community from '../pages/community/Community'
import React from "react";

export const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' render={() => (<Redirect to='/generate/hsl-basic' />)}  />
      <Route exact path='/generate/hsl-basic' component={HSLBasicContainer} />
      <Route path='/generate/custom' component={Custom} />
      <Route path='/generate/picture' component={Picture} />
      {/*<Route path='/community' component={Community} />*/}
    </Switch>
  </main>
)
