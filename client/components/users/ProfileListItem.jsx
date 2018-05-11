// if expanded = false
  // renders '<Lastname>, <Firstname>, <Lawyer/Law Centre Member>'
// else renders
  // User.jsx
  // Approve Button
  // if user is a law centre member
    // 'Approve as Admin' checkbox
    import React from 'react'

    import Profile from './Profile'
  
    const ProfileListItem = ({profile}) => (
      <Profile singleProfile={profile} />
    )

    export default ProfileListItem