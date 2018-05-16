import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'

// parents coming through from different containers for this Matter.jsx
const MemberMatter = (props) => (
  <div className='new-matter-wrapper'>
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
          <span className="span-margin-bottom fontsize125">
            <strong className='matter-title'>Subcategories: </strong>
            {props.singleMatter.subcategories.length
              ? props.singleMatter.subcategories.map(subCat => {
                return (
                  <Chip key={subCat} label={subCat} />
                )
              })
              : <Chip label='N/A'/>
            }
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
          <span className='center-horizontally'>
            <Button
              variant="raised"
              color='primary'
              className="two columns"
              type="submit"
              href={`/edit/${props.singleMatter.referenceNumber}`}
            >
            Edit
            </Button>
            <Button
              variant="raised"
              style={{
                backgroundColor: '#b52545',
                color: '#ffffff'
              }}
              className="two columns"
              id='close-button'
              type="submit"
              onClick={() => { props.handleClose(props.singleMatter.referenceNumber) }}
            >
            Close
            </Button>
          </span>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
)

export default MemberMatter
