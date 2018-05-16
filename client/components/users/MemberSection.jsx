import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import MemberLanding from './MemberLanding'

class MemberSection extends React.Component {
  constructor (props) {
    super(props)
    if (!this.props.isAuthenticated) {
      this.props.history.push('/')
    } else if (this.props.pending) {
      this.props.history.push('/pending')
    }
  }

  render () {
    return <MemberLanding />
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    pending: state.auth.user ? state.auth.user.pending : 1
  }
}
export default connect(mapStateToProps)(withRouter(MemberSection))
