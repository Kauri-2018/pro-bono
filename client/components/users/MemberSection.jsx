import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

import MemberLanding from './MemberLanding'

class MemberSection extends React.Component {
  componentWillMount () {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/')
    }
  }
  render () {
    return (
      <div>
        <MemberLanding />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps)(withRouter(MemberSection))
