// Contains accordion of MatterListItems
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import {getLiveMatters} from '../../actions/matters'

import MatterListItem from './MatterListItem'

class MatterList extends React.Component {
  constructor (props) {
    super(props)
    state = {
      expanded: null
    }

    this.handleClaim = this.handleClaim.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
  }

  handleClaim () {
    console.log('Hello')
  }
    handleExpand = panel => (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false
      });
    }

  componentDidMount () {
    this.props.dispatch(getLiveMatters())
  }

  render () {
    return (
      <div className='matterList'>
        {this.props.liveMatters.length
          ? this.props.liveMatters.map(matter =>
            <MatterListItem
              key={matter.referenceNumber}
              matter={matter}
              handleClaim = {this.handleClaim}
              handleExpand = {this.handleExpand}
              expanded = {{expanded} = this.state.expanded}
            />
          )
          : <h4>No Live Matters</h4>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    liveMatters: state.matterList
  }
}

MatterList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles))(MatterList)
