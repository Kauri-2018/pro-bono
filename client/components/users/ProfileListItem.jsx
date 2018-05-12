// if expanded = false
// renders '<Lastname>, <Firstname>, <Lawyer/Law Centre Member>'
// else renders
// User.jsx
// Approve Button
// if user is a law centre member
// 'Approve as Admin' checkbox
import React from 'react'

import Profile from './Profile'

class ProfileListItem extends React.Component {
  constructor (props) {
    super(props)
   // this.approveProfile = this.approveProfile.bind(this)
  }

  render () {
    return (
      <div>
        <Profile singleProfile={this.props.profile} />
        {/* <button onClick={this.props.approveProfile}>Approve</button> */}
      </div>
    )
  }
}

export default ProfileListItem
