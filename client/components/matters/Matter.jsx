import React from 'react'
import Card from 'material-ui/Card'
import Divider from 'material-ui/Divider'

// parents coming through from differentcontainers for this Matter.jsx
const Matter = (props) => (
  <div className='new-matter-wrapper offset-by-two column eight columns'>
    <Card position="static" color="default" className="matter">
      <div><strong>Title: </strong>{props.matterById.title}</div>
      <Divider />
      <div><strong>Internal Reference Id: </strong>{props.matterById.internalMatterNumber}</div>
      <Divider />
      <div><strong>Category: </strong>{props.matterById.category}</div>
      <Divider />
      <div><strong>Details: </strong>{props.matterById.details}</div>
    </Card>
  </div>
)

export default Matter
