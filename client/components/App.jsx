// Boilerplate
import React from 'react'
import {connect} from 'react-redux'

import Navbar from './Navbar'
import Login from './auth/Login'
import LawyerSection from './users/LawyerSection'
import MemberSection from './users/MemberSection'

const App = props => {
  return (
    <div className='app container'>
      <Navbar />
      {!props.user && <Login />}
      {props.user && (props.user.role === 'lawyer'
        ? <LawyerSection matterId={550001}/>
        : <MemberSection />)}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(App)
