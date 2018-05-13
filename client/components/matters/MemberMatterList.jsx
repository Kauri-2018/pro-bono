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
import {getIncompleteMatters} from '../../actions/matters'
import {closeMatter} from '../../apiClient'
import MemberMatterListItem from './MemberMatterListItem'

class MemberMatterList extends ListTemplate {
  constructor (props) {
    super(props)
    this.handleCloseMatter = this.handleCloseMatter.bind(this)
  }

  handleCloseMatter (matterId) {
    closeMatter(matterId)
      .then(() => {
        this.props.dispatch(getIncompleteMatters())
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  componentDidMount () {
    this.props.dispatch(getIncompleteMatters())
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
      <div className='matterList'>
        {this.props.incompleteMatters.length
          ? this.applyFilters(this.props.incompleteMatters)
            .map(matter =>
              <MemberMatterListItem
                key={matter.referenceNumber}
                matter={matter}
                handleClose= {this.handleClose}
                handleExpand = {this.handleExpand}
                expanded = {this.state.expanded === matter.referenceNumber}
              />
            )
          : <h4>No Incomplete Matters</h4>
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
