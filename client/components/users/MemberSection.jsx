// renders
// 'Your active matter'
// Matter.jsx
// 'Please contact the above law centre for extra information'
import React from 'react'
import {connect} from 'react-redux'
import {getMatterById} from '../../actions/matters'

import NewMatter from '../matters/NewMatter'
import ApproveProfiles from './ApproveProfiles'

class MemberSection extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <NewMatter matterById={this.props.matterById} />
        <ApproveProfiles />
      </div>
    )
  }
}

export default connect()(MemberSection)
