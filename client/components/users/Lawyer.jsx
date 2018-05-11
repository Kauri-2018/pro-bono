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
        {this.props.matterById ? 
        <ActiveMatter matterById={this.props.matterById} /> :
        <MatterList matters={this.props.allMatters} />}
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

export default connect(mapStateToProps)(Lawyer)