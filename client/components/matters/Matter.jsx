import React from 'react'

// parents coming through from differentcontainers for this Matter.jsx
const Matter = (props) => (
  <div className='matter'>
    <div>Title :{props.matter.title}</div>
    <div>Internal Reference Id :{props.matter.internalMatterNumber}</div>
    <div>Category:{props.matter.category}</div>
    <div>Details:{props.matter.details}</div>
  </div>
)

export default Matter
