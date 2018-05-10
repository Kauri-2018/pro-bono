// renders
// 'Your active matter'
// Matter.jsx
// 'Please contact the above law centre for extra information'
import React from 'react'
import {connect} from 'react-redux'
import {getMatterById} from '../../actions/matters'

import Matter from './Matter'

class ActiveMatter extends React.Component {
  constructor (props) {
    super(props)
    this.displayMatter = this.displayMatter.bind(this)
  }

  displayMatter () {
    this.props.dispatch(getMatterById(550001))
  }

  render () {
    return (
      <div>
        <button onClick={this.displayMatter}>Display Matter </button>
        <Matter matterById={this.props.matterById} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // should return an object with all details of matters
    matterById: state.matterById
  }
}

export default connect(mapStateToProps)(ActiveMatter)
