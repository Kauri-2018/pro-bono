// Boilerplate
import React from 'react'
import {connect} from 'react-redux'

import Navbar from './Navbar'
import Matter from './matters/Matter'

const App = () => {
  const matter = this.props.matter
  return (
    <div>
      <Navbar />
      <Matter propsFromParent={matter} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    matter: this.state.matterById
  }
}

export default connect(mapStateToProps)(App)
