import { Switch, Route, Redirect } from 'react-router-dom'
import HSLBasicContainer from '../pages/color-generation/HSL-basic/HSLBasicContainer'
import Custom from '../pages/color-generation/Custom/Custom'
import Picture from '../pages/color-generation/Picture/Picture'
import HSLAdvancedContainer from '../pages/color-generation/HSL-advanced/HSLAdvancedContainer'

//import Community from '../pages/community/Community'
import React from "react";

export const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' render={() => (<Redirect to='/hsl-basic' />)}  />
      <Route exact path='/hsl-basic' component={HSLBasicContainer} />
      <Route exact path='/hsl-advanced' component={HSLAdvancedContainer} />
      <Route path='/custom' component={Custom} />
      <Route path='/picture' component={Picture} />
      {/*<Route path='/community' component={Community} />*/}
    </Switch>
  </main>
)
