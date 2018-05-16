// Modules
import React from 'react'
import {connect} from 'react-redux'

// Material UI Components
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import CircularProgress from '@material-ui/core/CircularProgress'

// Our Modules and Components
import ListTemplate from './ListTemplate'
import {getIncompleteMatters} from '../../actions/matters'
import {closeMatter} from '../../apiClient'
import MemberMatterListItem from './MemberMatterListItem'
import {showSnackbar} from '../../actions/snackbar'

class MemberMatterList extends ListTemplate {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
      filters: {},
      claimFilter: 'all',
      menuIsOpen: false,
      anchorEl: null
    }
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
        this.props.dispatch(showSnackbar(`Matter #${matterId} closed`))
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

      <div className='filter-list-wrapper center-vertical'>
        <span className="push-apart">
          <span>
            Status:
          </span>
          <Button
            aria-owns={this.state.anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            {(claimFilter === 'all' || !claimFilter)
              ? 'All matters'
              : claimFilter === 'claimed'
                ? 'Claimed matters'
                : 'Unclaimed matters'}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.menuIsOpen}
            onClose={e => { this.closeMenu(e, claimFilter) }}
          >
            <MenuItem onClick={e => { this.closeMenu(e, 'all') }}>
            All matters
            </MenuItem>
            <MenuItem onClick={e => { this.closeMenu(e, 'claimed') }}>
            Claimed matters
            </MenuItem>
            <MenuItem onClick={e => { this.closeMenu(e, 'unclaimed') }}>
            Unclaimed matters
            </MenuItem>
          </Menu>
        </span>

        <span className="push-apart">
          <span>Reference number: </span>
          <TextField
            className='input-left'
            name="referenceNumber"
            floatingLabelText="Reference number"
            margin="normal"
            onChange={this.changeFilter}
            endAdornment={(<InputAdornment position="end"><Icon>search</Icon></InputAdornment>)}
          />
        </span>
        <span className="push-apart">
          <span> Internal matter number: </span>
          <TextField
            className='input-left'
            name="internalMatterNumber"
            floatingLabelText="Internal matter number"
            margin="normal"
            onChange={this.changeFilter}
            endAdornment={(<InputAdornment position="end"><Icon>search</Icon></InputAdornment>)}
          />
        </span>
        <span className="push-apart">
          <span>Category: </span>
          <TextField
            className='input-left'
            name="category"
            margin="normal"
            onChange={this.changeFilter}
          />
        </span>
      </div>
    )
  }

  renderList () {
    if (this.props.loading) {
      return <CircularProgress className='center-horizontally' size={65} />
    }
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
          : <h4>There are no open matters</h4>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  if (!state.matterList.matters) {
    return {
      incompleteMatters: [],
      currentUser: state.auth.user,
      loading: state.loading
    }
  }
  const incompleteMatters = state.matterList.matters.map(matter => {
    const newMatter = {...matter}
    newMatter.isClaimed = !!matter.claimedBy
    return newMatter
  })
  return {
    incompleteMatters,
    currentUser: state.auth.user,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(MemberMatterList)
