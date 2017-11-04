import React from 'react'
import { Switch, Route,
   // Redirect 
} from 'react-router-dom'
// import Home from '../home'
// import Login from '../login'
// import ChartContainer from '../chart'

import ItemsReport from '../reports/items'
// import PaymentStats from '../statistic/daySummary'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Container = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ItemsReport}/>
      {/* <Route path='/dashboard' component={ChartContainer}/> */}
      <Route path='/items' component={ItemsReport}/>
      {/* <Route path='/daysumary' component={PaymentStats}/>
      <Redirect from="/" to="/stats"/> */}
    </Switch>
  </main>
)

export default Container
