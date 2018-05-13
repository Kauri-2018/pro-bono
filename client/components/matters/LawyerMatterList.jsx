// Modules
import React from 'react'
import {connect} from 'react-redux'

// Material UI Components
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Input, {InputLabel, InputAdornment} from 'material-ui/Input'
import Icon from 'material-ui/Icon'

// Our Modules and Components
import ListTemplate from './ListTemplate'
import MatterListItem from './MatterListItem'
import {getLiveMatters} from '../../actions/matters'
import {claimMatter} from '../../apiClient'

class LawyerMatterList extends ListTemplate {
  constructor (props) {
    super(props)
    this.handleClaim = this.handleClaim.bind(this)
  }

  handleClaim (matterId) {
    claimMatter(matterId, this.props.currentUser.profileId)
      .then(() => {
        this.props.dispatch(this.props.getMattersFunction(this.props.currentUser.profileId))
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  componentDidMount () {
    this.props.dispatch(this.props.getMattersFunction(this.props.currentUser.profileId))
  }

  renderFilters () {
    return (
      <div className='filter-list-wrapper'>
        Reference ID: <TextField
          className='input-left'
          name="referenceNumber"
          floatingLabelText="Reference ID"
          margin="normal"
          onChange={this.changeFilter}
          endAdornment={(<InputAdornment position="end"><Icon>search</Icon></InputAdornment>)}
        />
        Category: <TextField
          className='input-left'
          name="category"
          label="Category"
          margin="normal"
          onChange={this.changeFilter}
        />
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
    storedMatters: state.matterList.matters,
    currentUser: state.auth.user
  }
}

export default connect(mapStateToProps)(LawyerMatterList)
