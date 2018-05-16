import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

// parents coming through from different containers for this Matter.jsx
const LawyerMatter = (props) => (
  <div className='new-matter-wrapper offset-by-two column eight columns'>
    <ExpansionPanel expanded={props.expanded} onChange={e => {
      props.handleExpand(props.singleMatter.referenceNumber)(e, !props.expanded)
    } }>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="">
          <span className="span-margin-bottom fontsize125">
            <strong className='matter-title'>Title: </strong>
            <strong>{props.singleMatter.title}</strong>
          </span>
          <br/>
          <span className="span-margin-bottom fontsize125">
            <strong className='matter-title'>Category: </strong>
            {props.singleMatter.category}
          </span>
          <br/>
          <span className="span-margin-bottom fontsize125">
            <strong className='matter-title'>Reference number: </strong>
            {props.singleMatter.referenceNumber}
          </span>
          <br/>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <span className="fontsize125">
            <strong className='matter-title'>Details: </strong>{
              props.singleMatter.details}
          </span>
          <br/>
          <br/>
          <span className="fontsize125">
            <strong className='matter-title'>Enquiries to: </strong>
            {props.singleMatter.contactEmail}
          </span>
          <br/>
          <br/>
          {props.buttonData &&
            props.buttonData.map(button => {
              return (
                <Button variant="raised"
                  color="primary"
                  className="btn-submit offset-by-four columns four columns "
                  type="submit"
                  key="btn"
                  onClick={() => {
                    button.fn(props.getMattersFunction, props.singleMatter.referenceNumber)
                  }}>
                  {button.text}
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
