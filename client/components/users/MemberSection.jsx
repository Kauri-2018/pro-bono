// renders
// 'Your active matter'
// Matter.jsx
// 'Please contact the above law centre for extra information'
import React from 'react'
import {connect} from 'react-redux'

import MemberLanding from '../users/MemberLanding'

const MemberSection = () => (
  <div>
    <MemberLanding />
  </div>
)

export default connect()(MemberSection)
