import React from 'react'
import {connect} from 'react-redux'
import {getIncompleteMatters} from '../../actions/matters'
// import {closeMatter} from '../../apiClient'
import MemberMatterListItem from './MatterListItem'

class MemberMatterList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }

    this.handleClaim = this.handleClaim.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
  }

  handleClose (matterId) {
    closeMatter(matterId)
      .then(() => {
        this.props.dispatch(getIncompleteMatters())
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
    this.props.dispatch(getIncompleteMatters())
  }

  render () {
    return (
      <div className='matterList'>
        {this.props.incompleteMatters.length
          ? this.props.incompleteMatters.map(matter =>
            <MemberMatterListItem
              key={matter.referenceNumber}
              matter={matter}
              handleClaim = {this.handleClaim}
              handleExpand = {this.handleExpand}
              expanded = {this.state.expanded === matter.referenceNumber}
            />
          )
          : <h4>No Matters</h4>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    incompleteMatters: state.matterList
  }
}

export default connect(mapStateToProps)(MemberMatterList)
