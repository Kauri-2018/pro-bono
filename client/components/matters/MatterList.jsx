import React from 'react'
import {connect} from 'react-redux'
import {getLiveMatters} from '../../actions/matters'
import {claimMatter} from '../../apiClient'
import MatterListItem from './MatterListItem'

class MatterList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }

    this.handleClaim = this.handleClaim.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
  }

  handleClaim (matterId) {
    claimMatter(matterId, this.props.claimedById)
      .then(() => {
        this.props.dispatch(getLiveMatters())
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  handleExpand (panel) {
    return (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false
      })
        .catch(err => {
          console.log(err.message)
        })
    }
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
              expanded = {this.state.expanded === matter.referenceNumber}
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
    liveMatters: state.matterList,
    claimedById: state.auth.user.id
  }
}

export default connect(mapStateToProps)(MatterList)
