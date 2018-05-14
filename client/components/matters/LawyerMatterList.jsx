// Modules
import React from 'react'
import {connect} from 'react-redux'

// Material UI Components
import TextField from 'material-ui/TextField'

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
      <div className='filter-list-wrapper offset-by-two column four columns center-vertical'>
        <span className="flex-alignright"><span> Reference ID: </span><TextField
          className='input-left'
          name="referenceNumber"
          floatingLabelText="Reference ID"
          margin="normal"
          onChange={this.changeFilter}
        /></span>
        <span className="flex-alignright"><span>Category: </span><TextField
          className='input-left'
          name="category"
          label="Category"
          margin="normal"
          onChange={this.changeFilter}
        /></span>
      </div>
    )
  }

  renderList () {
    return (
      <div className='list'>
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
          : <h4>No live matters</h4>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    storedMatters: state.matterList.matters,
    currentUser: state.auth.user
  }
}

export default connect(mapStateToProps)(LawyerMatterList)
