// Boilerplate
import React from 'react'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'

import Navbar from './Navbar'
import Login from './auth/Login'
import LawyerSection from './users/LawyerSection'
import MemberSection from './users/MemberSection'

const App = props => {
  return (
    <div className='app container'>
      <Navbar />
      <Switch>
        <Route path='/lawyer/register' />
        <Route path='/member/register' />
        <Route path='/lawyer' component={LawyerSection}/>
        <Route path='/member' component={MemberSection}/>
      </Switch>
      {!props.user ? <Login /> : <h1>You are already logged in</h1>}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(App)
