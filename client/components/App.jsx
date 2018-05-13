// Node Packages
import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import decode from 'jwt-decode'

// Our Modules
import {get} from '../utils/localstorage'
import { receiveLogin } from '../actions/login'

// Components
import Navbar from './Navbar'
import Login from './auth/Login'
import LawyerSection from './users/LawyerSection'
import MemberSection from './users/MemberSection'
import RegisterSection from './auth/RegisterSection'
import Register from './auth/Register'
import PendingLanding from './auth/PendingLanding'

class App extends React.Component {
  render () {
    return (
      <Router>
        <div className='app container'>
          <Navbar />
          <Switch>
            <Route exact path='/pending' component={PendingLanding} />
            <Route exact path='/lawyer' component={LawyerSection} />
            <Route exact path='/member' component={MemberSection} />
            <Route exact path='/admin' component={MemberSection} />
            <Route path='/:type/register' component={Register}/>
            <Route path='/' component={renderHome} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const renderHome = props => {
  return !props.user
    ? (<div>
      <Login />
      <RegisterSection />
    </div>)
    : <h1>You are already logged in</h1>
}

function mapStateToProps (state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(App)
