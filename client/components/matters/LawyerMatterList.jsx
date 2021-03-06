// Modules
import React from 'react'
import {connect} from 'react-redux'

// Material UI Components
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

// Our Modules and Components
import ListTemplate from './ListTemplate'
import MatterListItem from './MatterListItem'

class LawyerMatterList extends ListTemplate {
  componentDidMount () {
    if (this.props.currentUser) {
      this.props.dispatch(this.props.getMattersFunction(this.props.currentUser.profileId))
    }
  }

  renderFilters () {
    return (
      <div className='filter-list-wrapper center-vertical'>
        <span className="flex-alignright"><span> Reference ID: </span><TextField
          className='input-left'
          name="referenceNumber"
          margin="normal"
          onChange={this.changeFilter}
        /></span>
        <span className="flex-alignright"><span>Category: </span><TextField
          className='input-left'
          name="category"
          margin="normal"
          onChange={this.changeFilter}
        /></span>
      </div>
    )
  }

  renderList () {
    if (this.props.loading) {
      return <CircularProgress className='center-horizontally' size={65} />
    }
    return (
      <div>
        {this.props.storedMatters && this.props.storedMatters.length
          ? this.applyFilters(this.props.storedMatters)
            .map(matter =>
              <MatterListItem
                key={matter.referenceNumber}
                matter={matter}
                buttonData = {this.props.buttonData}
                handleExpand = {this.handleExpand}
                getMattersFunction = {this.props.getMattersFunction}
                expanded = {this.state.expanded === matter.referenceNumber}
              />
            )
          : this.props.matters === 'claimed' ? <h4>You have no claimed matters</h4>
            : this.props.matters === 'live' ? <h4>We could not find any matters with those filters</h4>
              : <h4>You have not completed any matters</h4>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    storedMatters: state.matterList.matters,
    currentUser: state.auth.user,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(LawyerMatterList)
