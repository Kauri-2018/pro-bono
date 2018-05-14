import React from 'react'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

// parents coming through from different containers for this Matter.jsx
const LawyerMatter = (props) => (
  <div className='new-matter-wrapper offset-by-two column eight columns'>
    <ExpansionPanel expanded={props.expanded} onChange={e => { props.handleExpand(props.singleMatter.referenceNumber)(e, !props.expanded) } }>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="">
          <span className="span-margin-bottom fontsize175"><strong>Title: </strong>{props.singleMatter.title}</span><br/>
          <span className="span-margin-bottom fontsize125"><strong>Category: </strong>{props.singleMatter.category}</span><br/>
          <span className="span-margin-bottom fontsize125"><strong>Reference number: </strong>{props.singleMatter.referenceNumber}</span><br/>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <span className="fontsize125"><strong>Details: </strong>{props.singleMatter.details}</span><br/><br/>
          <span className="fontsize125"><strong>Enquiries to: </strong>{props.singleMatter.contactEmail} </span><br/><br/>
          {props.handleClaim && <Button variant="raised"
            color="primary"
            className="btn-submit offset-by-four columns four columns "
            type="submit"
            onClick={() => { props.handleClaim(props.singleMatter.referenceNumber) }}>Claim
          </Button>}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
)

export default LawyerMatter
