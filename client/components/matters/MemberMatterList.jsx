// Node modules
import React from 'react'
import {connect} from 'react-redux'

// Our modules and imports
import {getIncompleteMatters} from '../../actions/matters'
import {closeMatter} from '../../apiClient'
import MemberMatterListItem from './MemberMatterListItem'

class MemberMatterList extends ListTemplate {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.handleClose = this.handleClose.bind(this)
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
              handleClose= {this.handleClose}
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
