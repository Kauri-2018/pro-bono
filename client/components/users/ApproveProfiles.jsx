// renders 'Profiles' waiting for approval:'
import React from 'react'
import {connect} from 'react-redux'
import {getPendingProfiles} from '../../actions/profiles'

import ProfileList from './ProfileList'

class ApproveProfiles extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.dispatch(getPendingProfiles())
  }

  render () {
    return (
      <div>
        <ProfileList pendingProfiles={this.props.pendingProfilesArray} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pendingProfilesArray: state.profiles
  }
}

export default connect(mapStateToProps)(ApproveProfiles)
