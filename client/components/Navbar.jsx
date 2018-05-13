import React from 'react'
import {connect} from 'react-redux'

import Logout from './auth/Logout'

const Navbar = props => {
  return (
    <div className='row navbar'>
      <h4>Nav bar to be completed</h4>
      {props.isAuthenticated && <Logout />}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Navbar)
