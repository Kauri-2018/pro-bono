// if expanded = false
// renders '<Lastname>, <Firstname>, <Lawyer/Law Centre Member>'
// else renders
// User.jsx
// Approve Button
// if user is a law centre member
// 'Approve as Admin' checkbox
// Node Modules
import React from 'react'

// Material UI Components
import Checkbox from 'material-ui/Checkbox'
import {FormControlLabel} from 'material-ui/Form'

// Our Components
import Profile from './Profile'

class ProfileListItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isAdmin: false
    }

    this.setAdmin = this.setAdmin.bind(this)
  }

  setAdmin () {
    this.setState({
      isAdmin: !this.state.isAdmin
    })
  }

  render () {
    return (
      <div>
        <Profile singleProfile={this.props.profile} />
        <button onClick={() => this.props.approveProfile(this.props.profile.profileId, this.state.isAdmin)}>Approve</button>
        {this.props.profile.role === 'member' && <FormControlLabel
          control={
            <Checkbox
              checked={this.state.isAdmin}
              onChange={this.setAdmin}
            />
          }
          label="Give user administrator privileges"
        />}
      </div>
    )
  }
}

export default ProfileListItem
