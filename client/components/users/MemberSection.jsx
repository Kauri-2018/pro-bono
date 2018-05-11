// renders
// 'Your active matter'
// Matter.jsx
// 'Please contact the above law centre for extra information'
import React from 'react'
import {connect} from 'react-redux'
import {getMatterById} from '../../actions/matters'

import NewMatter from '../matters/NewMatter'

class MemberSection extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.dispatch(getMatterById(this.props.matterId))
  }

  render () {
    return (
      <div>
        <NewMatter matterById={this.props.matterById} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // should return an object with all details of a single matter
    matterById: state.matterById
  }
}

export default connect(mapStateToProps)(MemberSection)
