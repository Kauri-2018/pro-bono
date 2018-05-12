// renders 'Profiles' waiting for approval:'
import React from 'react'
import {connect} from 'react-redux'
import {getPendingProfiles} from '../../actions/profiles'
import {approvePendingProfile} from '../../apiClient'

import ProfileList from './ProfileList'

class ApproveProfiles extends React.Component {
  constructor (props) {
    super(props)
    this.approveProfile = this.approveProfile.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(getPendingProfiles())
  }

  approveProfile (profileId) {
    let isAdmin = false
    if (this.props.role === 'admin') {
      isAdmin = true
    } else {
      isAdmin = false
    }
    approvePendingProfile(profileId, isAdmin)
      .then(this.props.dispatch(getPendingProfiles()))
  }

  render () {
    return (
      <div>
        <ProfileList
          pendingProfiles={this.props.pendingProfilesArray}
          approveProfile={this.approveProfile} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pendingProfilesArray: state.profiles,
    role: state.auth.user.role
  }
}

export default connect(mapStateToProps)(ApproveProfiles)
