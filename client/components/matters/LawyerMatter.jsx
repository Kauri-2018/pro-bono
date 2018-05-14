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
          <strong>Title: </strong>{props.singleMatter.title}<br/>
          <strong>Category: </strong>{props.singleMatter.category}<br/>
          <strong>Reference Number: </strong>{props.singleMatter.referenceNumber}<br/>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <strong>Details: </strong>{props.singleMatter.details} <br/><br/>
          <strong>Enquiries to: </strong>{props.singleMatter.contactEmail} <br/><br/>
          {props.buttonData && 
            props.buttonData.map(button => {
              return (
                <Button variant="raised"
                  color="primary"
                  className="btn-submit offset-by-four columns four columns "
                  type="submit"
                  onClick={() => { button.fn(props.getMattersFunction, props.singleMatter.referenceNumber) }}>{button.text}
                </Button>
              )
            })
          }
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
)

export default LawyerMatter
