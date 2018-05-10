// Boilerplate - navbar just needs a logo for now
import React from 'react'
import {connect} from 'react-redux'
import {Route, withRouter} from 'react-router-dom'

// import Links from './Links'
import Logout from './auth/Logout'
// import LoginForm from './LoginForm'
// import RegisterForm from './RegisterForm'

const Navbar = ({isAuthenticated}) => {
  return (
    <nav>
      <div>
        <div>
          {!isAuthenticated && (
            <div>

            </div>
          )}

          {isAuthenticated && <Logout />}

          <hr />
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default withRouter(connect(mapStateToProps)(Navbar))
