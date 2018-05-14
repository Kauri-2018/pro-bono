// renders accordion of UserListItems.jsx
import React from 'react'

// // Material UI Components
// import classNames from 'classnames'
// import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'

// Our Components
import ProfileListItem from './ProfileListItem'
import ListTemplate from '../matters/ListTemplate'

/* const styles = {
  customWidth: {
    width: 200
  }
} */

class ProfileList extends ListTemplate {
  constructor (props) {
    super(props)
    this.state = {
      roleFilter: 'all',
      menuIsOpen: false,
      anchorEl: null
    }
    this.closeMenu = this.closeMenu.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  closeMenu (e, filterType) {
    this.setState({
      menuIsOpen: false,
      roleFilter: filterType,
      anchorEl: e.target
    })
  }

  handleClick (e) {
    this.setState({ menuIsOpen: true })
  }

  renderFilters () {
    const roleFilter = this.state.roleFilter
    return (
      <div className='pending-profiles-wrapper'>
        <Button
          aria-owns={this.state.anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {(roleFilter === 'all' || !roleFilter) ? 'All roles' : roleFilter === 'lawyers' ? 'Lawyers' : 'Law centre members'}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.menuIsOpen}
          onClose={e => { this.closeMenu(e, roleFilter) }}
        >
          <MenuItem onClick={e => { this.closeMenu(e, 'all') }}>All roles</MenuItem>
          <MenuItem onClick={e => { this.closeMenu(e, 'lawyers') }}>Lawyers</MenuItem>
          <MenuItem onClick={e => { this.closeMenu(e, 'members') }}>Law centre members</MenuItem>
        </Menu>
      </div>
    )
  }
  renderList () {
    const roleFilter = this.state.roleFilter
    return (
      <div className='list'>
        {this.props.pendingProfiles.length
          ? this.applyFilters(this.props.pendingProfiles.filter(profile =>
            (roleFilter === 'all' ||
            (roleFilter === 'lawyers' && profile.role === 'lawyer') ||
            (roleFilter === 'members' && profile.role === 'member'))
          ))
            .map(profile =>
              <ProfileListItem
                key={profile.profileId}
                profile={profile}
                approveProfile={this.props.approveProfile}
                handleExpand = {this.handleExpand}
                expanded = {this.state.expanded === profile.profileId}
              />
            )
          : <h4>No Pending Profiles</h4>
        }
      </div>
    )
  }
}

export default ProfileList
