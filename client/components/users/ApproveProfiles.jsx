// renders 'Profiles' waiting for approval:'
import React from 'react'
import {connect} from 'react-redux'
import {getPendingProfiles} from '../../actions/profiles'

import ProfileList from './ProfileList'

class ApproveProfiles extends React.Component {
  constructor (props) {
    super(props)
    this.approveProfile = this.approveProfile.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(getPendingProfiles())
  }

  approveProfile () {
    const profileId = this.props.profile.profileId
    let isAdmin = false
    if (this.props.auth.user.role === 'admin') {
      isAdmin = true
    } else {
      isAdmin = false
    }
    this.props.dipatch(approvePendingProfile(profileId, isAdmin))
  }

  render () {
    return (
      <div>
        <ProfileList pendingProfiles={this.props.pendingProfilesArray} approveProfile={this.approveProfile}/>
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
