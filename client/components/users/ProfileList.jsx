// renders accordion of UserListItems.jsx
import React from 'react'

import ProfileListItem from './ProfileListItem'

const ProfileList = ({pendingProfiles, approveProfile}) => (
  <div className='profileList'>
    {pendingProfiles.map(profile =>
      <ProfileListItem
        key={profile.profileId}
        profile={profile}
        approveProfile={approveProfile}
      />
    )}
  </div>
)

export default ProfileList
