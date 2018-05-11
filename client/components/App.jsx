import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Navbar from './Navbar'
import Login from './auth/Login'
import LawyerSection from './users/LawyerSection'
import MemberSection from './users/MemberSection'
import RegisterSection from './auth/RegisterSection'
import Register from './auth/Register'

const App = props => {
  return (
    <Router>
      <div className='app container'>
        <Navbar />
        <Switch>
          <Route path='/lawyer/register/:type' component={Register}/>
          <Route path='/member/register/:type' component={Register}/>
          <Route path='/lawyer' component={LawyerSection} />
          <Route path='/member' component={MemberSection} />
          <Route path='/' component={renderHome} />
        </Switch>

      </div>
    </Router>
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
