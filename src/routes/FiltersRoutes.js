import { Switch, Route, Redirect } from 'react-router-dom'
import Custom from '../pages/color-generation/Custom/Custom'
import Picture from '../pages/color-generation/Picture/Picture'
import HSLAdvancedContainer from '../pages/color-generation/HSL-advanced/HSLAdvancedContainer'
import React from "react";
import Filters from '../pages/color-generation/HSL-basic/Filters'

export const FiltersRoutes = () => (
  <main>
    <Switch>
      <Route exact path='/' render={() => (<Redirect to='/generate/hsl-basic' />)}  />
      <Route exact path='/generate/hsl-basic' component={Filters} />
      <Route exact path='/generate/hsl-advanced' component={HSLAdvancedContainer} />
      <Route path='/generate/custom' component={Custom} />
      <Route path='/generate/picture' component={Picture} />
    </Switch>
  </main>
)
