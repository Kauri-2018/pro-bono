import React from 'react'

// parents coming through from differentcontainers for this Matter.jsx
const Matter = (props) => (
  <div className='matter'>
    <div>hi</div>
    <div>Title :{props.matterById.title}</div>
    <div>Internal Reference Id :{props.matterById.internalMatterNumber}</div>
    <div>Category:{props.matterById.category}</div>
    <div>Details:{props.matterById.details}</div>
  </div>
)

export default Matter
