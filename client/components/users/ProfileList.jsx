// renders accordion of UserListItems.jsx
import React from 'react'


import ProfileListItem from './ProfileListItem'

const ProfileList = ({pendingProfiles}) => (
  <div className='profileList'>
    {pendingProfiles.map(profile => 
      <ProfileListItem
      key={profile.profileId}
      profile={profile}
      />
      )}
  </div>
)

export default ProfileList