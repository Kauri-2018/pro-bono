// renders accordion of UserListItems.jsx
import React from 'react'

// // Material UI Components
import Button from 'material-ui/Button'
import Menu, {MenuItem} from 'material-ui/Menu'
import Paper from 'material-ui/Paper'

// Our Components
import ProfileListItem from './ProfileListItem'
import ListTemplate from '../matters/ListTemplate'

class ProfileList extends ListTemplate {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
      filters: {},
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
    this.setState({menuIsOpen: true})
  }

  renderFilters () {
    const roleFilter = this.state.roleFilter
    return (
      <div className='list'>
        <Paper
          zDepth={1}
          className='offset-by-four column'
          style={{
            height: 50,
            width: 400,
            textAlign: 'center',
            marginTop: 50,
            marginBottom: 50
          }}
        >
          FILTER BY:
          <Button
            aria-owns={this.state.anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            {(roleFilter === 'all' || !roleFilter)
              ? 'All roles'
              : roleFilter === 'lawyers'
                ? 'Lawyers'
                : 'Law centre members'}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.menuIsOpen}
            onClose={e => { this.closeMenu(e, roleFilter) }}
          >
            <MenuItem onClick={e => { this.closeMenu(e, 'all') }}>
              All roles
            </MenuItem>
            <MenuItem onClick={e => { this.closeMenu(e, 'lawyers') }}>
              Lawyers
            </MenuItem>
            <MenuItem onClick={e => { this.closeMenu(e, 'members') }}>
              Law centre members
            </MenuItem>
          </Menu>
        </Paper>
      </div>
    )
  }
  renderList () {
    const roleFilter = this.state.roleFilter
    return (
      <div className='list'>
        {this.props.pendingProfiles.length
          ? (this.props.pendingProfiles.filter(profile =>
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
          : <h4>No pending profiles</h4>
        }
      </div>
    )
  }
}

export default ProfileList
