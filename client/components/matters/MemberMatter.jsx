import React from 'react'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from 'material-ui/Typography'

// parents coming through from different containers for this Matter.jsx
const Matter = (props) => (
  <div className='new-matter-wrapper offset-by-two column eight columns'>
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="">
          <strong>Title: </strong>{props.singleMatter.title} <br/>
          <strong>Internal Reference Id: </strong>{props.singleMatter.internalMatterNumber}<br/>
          <strong>Category: </strong>{props.singleMatter.category}<br/>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <strong>Details: </strong>{props.singleMatter.details}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
)

export default Matter
