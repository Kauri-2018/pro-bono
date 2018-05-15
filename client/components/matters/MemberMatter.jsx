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
    <ExpansionPanel
      className="margin-bottom"
      expanded={props.expanded}
      onChange={e => {
        props.handleExpand(props.singleMatter.referenceNumber)(e, !props.expanded)
      } }>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography >
          <span className="span-margin-bottom fontsize125">
            <strong className='matter-title'>Title: </strong>
            <strong>{props.singleMatter.title}</strong>
          </span>
          <br/>
          <span className="span-margin-bottom fontsize125">
            <strong className='matter-title'>Reference number: </strong>
            {props.singleMatter.referenceNumber}
          </span>
          <br/>
          <span className="span-margin-bottom fontsize125">
            <strong className='matter-title'>Internal matter number: </strong>
            {props.singleMatter.internalMatterNumber}
          </span>
          <br/>
          <span className="span-margin-bottom fontsize125">
            <strong className='matter-title'>Category: </strong>
            {props.singleMatter.category}
          </span>
          <br/>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <span className="fontsize125">
            <strong className='matter-title'>Details: </strong>
            {props.singleMatter.details}
          </span>
          <br/>
          <br/>
          <br/>
          <Button
            variant="raised"
            color='primary'
            className="btn-submit two columns submit-button"
            type="submit"
            href={`/edit/${props.singleMatter.referenceNumber}`}
          >
            Edit
          </Button>
          <br/>
          <br/>
          <Button
            variant="raised"
            style={{
              backgroundColor: '#b52545',
              color: '#ffffff'
            }}
            className="btn-submit two columns submit-button"
            id='close-button'
            type="submit"
            onClick={() => { props.handleClose(props.singleMatter.referenceNumber) }}
          >
            Close
          </Button>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
)

export default MemberMatter
