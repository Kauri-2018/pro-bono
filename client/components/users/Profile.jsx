// renders:
// <Lastname>, <Firstname>
// Company: <company>
// Email: <email>
// Phone Number: <phoneNumber>
import React from 'react'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from 'material-ui/Typography'
import Checkbox from 'material-ui/Checkbox'
import {FormControlLabel} from 'material-ui/Form'
import Button from 'material-ui/Button'

// parents coming through from different containers for this Matter.jsx
class Profile extends React.Component {
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
      <div className='new-matter-wrapper offset-by-two column eight columns'>
        <ExpansionPanel
          expanded={this.props.expanded}
          onChange={e => {
            this.props.handleExpand(this.props.singleProfile.profileId)(e, !this.props.expanded)
          } }>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <span className='expansion-header'>
                <span className='secondary-text role-indicator'>
                  {this.props.singleProfile.role.toUpperCase()}
                </span>
                <span className='secondary-text role-indicator'>
                  {'   >   '}
                </span>
                <span className='primary-text'>
                  <strong>
                    {this.props.singleProfile.firstname} {this.props.singleProfile.lastname}
                  </strong>
                </span>
              </span>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {this.props.singleProfile.company
                ? <div>
                  <strong className='primary-text-red'>Company: </strong>
                  {this.props.singleProfile.company}
                </div>
                : <div>
                  <strong className='primary-text-red'>Law centre: </strong>
                  {this.props.singleProfile.centreId}
                </div>
              }
              <strong className='primary-text-red'>Email: </strong>
              {this.props.singleProfile.email}
              <br/>
              <strong className='primary-text-red'>Phone No. </strong>
              {this.props.singleProfile.phoneNumber}
              <br/>
              {this.props.singleProfile.role === 'member' &&
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.isAdmin}
                    onChange={this.setAdmin}
                  />
                }
                label="Set user as admin"
              />}
              <br/>
              <Button
                variant="raised"
                style={{
                  backgroundColor: '#C7003C',
                  color: '#ffffff'
                }}
                className="btn-submit"
                type="submit"
                onClick={() => {
                  this.props.approveProfile(
                    this.props.singleProfile.profileId,
                    this.state.isAdmin
                  )
                }}
              >
                Approve
              </Button>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

export default Profile
