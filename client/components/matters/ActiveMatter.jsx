// renders
// 'Your active matter'
// Matter.jsx
// 'Please contact the above law centre for extra information'
import React from 'react'
import {getMatterById} from '../../actions/matters'

import Matter from './Matter'

const ActiveMatter = (props) => (
      <div>
        <button onClick={this.displayMatter}>Display Matter </button>
        <Matter matterById={this.props.matterById} />
      </div>
)

export default ActiveMatter
