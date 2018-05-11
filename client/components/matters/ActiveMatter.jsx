// renders
// 'Your active matter'
// Matter.jsx
// 'Please contact the above law centre for extra information'
import React from 'react'

import Matter from './Matter'

const ActiveMatter = props => (
      <div>
        <Matter matterById={props.matterById} />
      </div>
)

export default ActiveMatter
