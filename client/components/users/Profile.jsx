// renders:
// <Lastname>, <Firstname>
// Company: <company>
// Email: <email>
// Phone Number: <phoneNumber>
import React from 'react'
import Card from 'material-ui/Card'
import Divider from 'material-ui/Divider'

// parents coming through from different containers for this Matter.jsx
const Profile = (props) => (
  <div className='profile'>
    <Card position="static" color="default" className="matter">
      <div>{props.singleProfile.lastname},{props.singleProfile.firstname}</div>
      <Divider />
      <div>{props.singleProfile.company}</div>
      <Divider />
      <div>{props.singleProfile.email}</div>
      <Divider />
      <div>{props.singleProfile.phoneNumber}</div>
    </Card>
  </div>
)

export default Profile
