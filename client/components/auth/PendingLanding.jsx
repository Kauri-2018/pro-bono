import React from 'react'
import {connect} from 'react-redux'

class PendingLanding extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <div>
        <p>Thank you for registering as a {this.props.role}.</p>
        <p>Your registration is currently pending approval. You will receive an email approving your registration within five business days.</p>
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
