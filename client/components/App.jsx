// Boilerplate
import React from 'react'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'

import Navbar from './Navbar'
import Login from './auth/Login'
import LawyerSection from './users/LawyerSection'
import MemberSection from './users/MemberSection'
import RegisterSection from './auth/RegisterSection'

const App = props => {
  return (
    <div className='app container'>
      <Navbar />
      <Switch>
        <Route path='/lawyer/register' />
        <Route path='/member/register' />
        <Route path='/lawyer' component={LawyerSection} />
        <Route path='/member' component={MemberSection} />
        <Route path='/' component={renderHome} />
      </Switch>

    </div>
  )
}

const renderHome = props => (
  !props.user
    ? <div>
      <Login />
      <RegisterSection />
    </div>
    : <h1>You are already logged in</h1>

)

function mapStateToProps (state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(App)
