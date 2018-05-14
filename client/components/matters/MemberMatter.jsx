import React from 'react'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

// parents coming through from different containers for this Matter.jsx
const MemberMatter = (props) => (
  <div className='new-matter-wrapper offset-by-two column eight columns'>
    <ExpansionPanel className="margin-bottom" expanded={props.expanded} onChange={e => { props.handleExpand(props.singleMatter.referenceNumber)(e, !props.expanded) } }>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography >
          <span className="span-margin-bottom fontsize175"><strong>Title: </strong>{props.singleMatter.title}</span><br/>
          <span className="span-margin-bottom fontsize125"><strong>Reference number: </strong>{props.singleMatter.referenceNumber}</span><br/>
          <span className="span-margin-bottom fontsize125"><strong>Internal matter number: </strong>{props.singleMatter.internalMatterNumber}</span><br/>
          <span className="span-margin-bottom fontsize125"><strong>Category: </strong>{props.singleMatter.category}</span><br/>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <span className="fontsize125"><strong>Details: </strong>{props.singleMatter.details}</span>
          <Button variant="raised"
            color="primary"
            className="btn-submit offset-by-four columns four columns "
            type="submit"
            onClick={() => { props.handleClose(props.singleMatter.referenceNumber) }}>Close
          </Button>
          <Button variant="raised"
            color="primary"
            className="btn-submit offset-by-four columns four columns "
            type="submit"
            href={`/edit/${props.singleMatter.referenceNumber}`}
          >Edit
          </Button>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
)

export default MemberMatter
