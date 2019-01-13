import { Switch, Route } from 'react-router-dom'
import HSL from '../pages/color-generation/HSL/HSL'
import Custom from '../pages/color-generation/Custom/Custom'
import Picture from '../pages/color-generation/Picture/Picture'
import Community from '../pages/community/Community'
import React from "react";

export const Main = () => (
  <main>
    <Switch>
      <Route exact path='/generate/hsl' component={HSL}/>
      <Route path='/generate/custom' component={Custom}/>
      <Route path='/generate/picture' component={Picture}/>
      <Route path='/community' component={Community}/>
    </Switch>
  </main>
)
