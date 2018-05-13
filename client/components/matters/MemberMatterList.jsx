// Modules
import React from 'react'
import {connect} from 'react-redux'

// Material UI Components
import classNames from 'classnames'
import {withStyles} from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Menu, {MenuItem} from 'material-ui/Menu'
import Input, {InputLabel, InputAdornment} from 'material-ui/Input'
import Icon from 'material-ui/Icon'

// Our Modules and Components
import ListTemplate from './ListTemplate'
import {getIncompleteMatters} from '../../actions/matters'
import {closeMatter} from '../../apiClient'
import MemberMatterListItem from './MemberMatterListItem'

const styles = {
  customWidth: {
    width: 200
  }
}

// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap'
//   },
//   margin: {
//     margin: theme.spacing.unit
//   },
//   textField: {
//     flexBasis: 200
//   }
// })

class MemberMatterList extends ListTemplate {
  constructor (props) {
    super(props)
    this.setState({
      expanded: false,
      claimFilter: 'all',
      menuIsOpen: false,
      anchorEl: null
    })
    this.handleCloseMatter = this.handleCloseMatter.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  closeMenu (e, filterType) {
    this.setState({
      menuIsOpen: false,
      claimFilter: filterType,
      anchorEl: e.target
    })
  }

  handleClick (e) {
    this.setState({menuIsOpen: true})
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
    const claimFilter = this.state.claimFilter
    return (

      <div className='filter-list-wrapper center-content'>
        <div className="offset-by-two column eight columns">
          <Button
            aria-owns={this.state.anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            {(claimFilter === 'all' || !claimFilter) ? 'All matters' : claimFilter === 'claimed' ? 'Claimed matters' : 'Unclaimed matters'}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.menuIsOpen}
            onClose={e => { this.closeMenu(e, claimFilter) }}
          >
            <MenuItem onClick={e => { this.closeMenu(e, 'all') }}>All matters</MenuItem>
            <MenuItem onClick={e => { this.closeMenu(e, 'claimed') }}>Claimed matters</MenuItem>
            <MenuItem onClick={e => { this.closeMenu(e, 'unclaimed') }}>Unclaimed matters</MenuItem>
          </Menu>

        Reference number: <TextField
            className='input-left'
            name="referenceNumber"
            floatingLabelText="Reference number"
            margin="normal"
            onChange={this.changeFilter}
            endAdornment={(<InputAdornment position="end"><Icon>search</Icon></InputAdornment>)}
          />
        Internal matter number: <TextField
            className='input-left'
            name="internalMatterNumber"
            floatingLabelText="Internal matter number"
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
      </div>
    )
  }

  renderList () {
    const claimFilter = this.state.claimFilter
    return (
      <div className='matter-list-wrapper'>
        {this.props.incompleteMatters.length
          ? this.applyFilters(this.props.incompleteMatters)
            .filter(matter => {
              if (!claimFilter) return true
              return (claimFilter === 'all' ||
              (claimFilter === 'claimed' && matter.isClaimed) ||
              (claimFilter === 'unclaimed' && !matter.isClaimed))
            })
            .map(matter =>
              <MemberMatterListItem
                key={matter.referenceNumber}
                matter={matter}
                handleClose= {this.handleCloseMatter}
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
  if (!state.matterList.matters) {
    return {
      incompleteMatters: [],
      currentUser: state.auth.user
    }
  }
  const incompleteMatters = state.matterList.matters.map(matter => {
    const newMatter = {...matter}
    newMatter.isClaimed = !!matter.claimedBy
    return newMatter
  })
  return {
    incompleteMatters,
    currentUser: state.auth.user
  }
}

export default connect(mapStateToProps)(MemberMatterList)
