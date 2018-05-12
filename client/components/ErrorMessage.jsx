import React from 'react'
import {connect} from 'react-redux'

class ErrorMessage extends React.Component {
  render () {
    const message = this.props.message
    return (
      <p>{message}</p>
    )
  }
}

const mapStateToProps = state => {
  return {
    message: state.errorMessage
  }
}

export default connect(mapStateToProps)(ErrorMessage)
