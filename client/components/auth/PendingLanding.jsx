import React from 'react'
import {connect} from 'react-redux'

class PendingLanding extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <p>Thank you for registering as a {this.props.role}.</p>
        <p>You are currently pending approval, and an email will be sent to {this.props.email} once you have been approved.</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.auth.user.role,
    email: state.auth.user.email
  }
}

export default connect(mapStateToProps)(PendingLanding)