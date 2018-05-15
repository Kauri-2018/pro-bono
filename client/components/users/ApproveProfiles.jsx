// renders 'Profiles' waiting for approval:'
import React from 'react'
import {connect} from 'react-redux'
import {getPendingProfiles} from '../../actions/profiles'
import {approvePendingProfile} from '../../apiClient'

import ProfileList from './ProfileList'
import ErrorMessage from '../ErrorMessage'

class ApproveProfiles extends React.Component {
  constructor (props) {
    super(props)
    this.approveProfile = this.approveProfile.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(getPendingProfiles())
  }

  approveProfile (profileId, isAdmin) {
    approvePendingProfile(profileId, isAdmin)
      .then(() => {
        this.props.dispatch(getPendingProfiles())
      })
  }

  render () {
    return (
      <div>
        <div>
          <p className='pageHeader'>
          APPROVE USERS
          </p>
        </div>
        <div>
          <ProfileList
            pendingProfiles={this.props.pendingProfilesArray}
            approveProfile={this.approveProfile} />
          <ErrorMessage />
        </div>
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
