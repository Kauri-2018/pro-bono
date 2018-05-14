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

// parents coming through from different containers for this Matter.jsx
const Profile = (props) => (
  <div className='new-matter-wrapper offset-by-two column eight columns'>
    <ExpansionPanel
      expanded={props.expanded}
      onChange={e => { props.handleExpand(props.singleProfile.profileId)(e, !props.expanded) } }>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>
          <strong>{props.singlePrfile.lastname}</strong>,{props.singlePrfile.firstname}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <strong>Lastname: </strong>{props.singleProfile.lastname} <br/><br/>
          <strong>Firstname: </strong>{props.singleProfile.firstname} <br/><br/>
          <strong>Company: </strong>{props.singleProfile.company} <br/><br/>
          <strong>Email: </strong>{props.singleProfile.email} <br/><br/>
          <strong>Phone No. </strong>{props.singleProfile.phoneNumber} <br/><br/>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
)

export default Profile
