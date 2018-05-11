// renders
// 'Your active matter'
// Matter.jsx
// 'Please contact the above law centre for extra information'
import React from 'react'
import {connect} from 'react-redux'
import {getMatterById} from '../../actions/matters'

import ActiveMatter from '../matters/ActiveMatter'
import MatterList from '../matters/MatterList'

class Lawyer extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.dispatch(getMatterById(this.props.matterId))
  }

  render () {
    return (
      <div>
        {this.props.matterId ? 
        <ActiveMatter matterById={this.props.matterById} /> :
        <MatterList />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    matterById: state.matterById
  }
}

export default connect(mapStateToProps)(Lawyer)