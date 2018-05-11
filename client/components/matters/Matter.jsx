import React from 'react'
import Card from 'material-ui/Card'
import Divider from 'material-ui/Divider'

// parents coming through from different containers for this Matter.jsx
const Matter = (props) => (
  <div className='new-matter-wrapper offset-by-two column eight columns'>
    <Card position="static" color="default" className="matter">
      <div><strong>Title: </strong>{props.singleMatter.title}</div>
      <Divider />
      <div><strong>Internal Reference Id: </strong>{props.singleMatter.internalMatterNumber}</div>
      <Divider />
      <div><strong>Category: </strong>{props.singleMatter.category}</div>
      <Divider />
      <div><strong>Details: </strong>{props.singleMatter.details}</div>
    </Card>
  </div>
)

export default Matter
