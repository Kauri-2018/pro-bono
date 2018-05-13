// renders
// 'Your active matter'
// Matter.jsx
// 'Please contact the above law centre for extra information'
import React from 'react'
import {connect} from 'react-redux'
import {getMatterById} from '../../actions/matters'
import { withRouter } from 'react-router-dom'

import ActiveMatter from '../matters/ActiveMatter'
import MatterList from '../matters/MatterList'

class LawyerSection extends React.Component {
  // constructor (props) {
  //   super(props)
  // }
  componentWillMount () {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentDidMount () {
    if (this.props.matterId) {
      this.props.dispatch(getMatterById(this.props.matterId))
    }
  }

  render () {
    return (
      <div>
        {this.props.matterId
          ? <ActiveMatter matterById={this.props.matterById} />
          : <MatterList />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    matterById: state.matterById,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(withRouter(LawyerSection))
