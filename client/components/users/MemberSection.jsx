import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import MemberLanding from './MemberLanding'

class MemberSection extends React.Component {
  componentWillMount () {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/')
    } else if (this.props.pending) {
      this.props.history.push('/pending')
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
    isAuthenticated: state.auth.isAuthenticated,
    pending: state.auth.user.pending
  }
}
export default connect(mapStateToProps)(withRouter(MemberSection))
