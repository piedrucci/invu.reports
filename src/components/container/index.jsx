import React from 'react'
import { Switch, Route,
   // Redirect
 } from 'react-router-dom'
// import Home from '../home'
// import Login from '../login'
// import ChartContainer from '../chart'

import SalesReport from '../reports/sales'
import DaySummaryReport from '../reports/daySummary'
import HoursReport from '../reports/hours'
// import PaymentStats from '../statistic/daySummary'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Container = () => (
  <main>
    <Switch>
      <Route exact path='/' component={SalesReport}/>
      {/* <Route path='/dashboard' component={ChartContainer}/> */}
      <Route path='/sales'     component={SalesReport}/>
      <Route path='/daysumary' component={DaySummaryReport}/>
      <Route path='/hours' component={HoursReport}/>
      {/* <Redirect from="/" to="/sales"/> */}
    </Switch>
  </main>
)

export default Container
