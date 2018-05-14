// if expanded = false
// renders '<Lastname>, <Firstname>, <Lawyer/Law Centre Member>'
// else renders
// User.jsx
// Approve Button
// if user is a law centre member
// 'Approve as Admin' checkbox
// Node Modules
import React from 'react'

// Material UI Components

// Our Components
import Profile from './Profile'

const ProfileListItem = (props) => (
  <div>
    <Profile
      singleProfile={props.profile}
      handleExpand = {props.handleExpand}
      expanded = {props.expanded}
      approveProfile={props.approveProfile}
    />
  </div>
)

export default ProfileListItem
