// renders
// 'Your active matter'
// Matter.jsx
// 'Please contact the above law centre for extra information'
import React from 'react'

import LawyerMatter from './LawyerMatter'

const ActiveMatter = props => (
  <div>
    <LawyerMatter singleMatter={props.matterById} />
  </div>
)

export default ActiveMatter
