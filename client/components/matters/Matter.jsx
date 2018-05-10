import React from 'react'

// parents coming through from differentcontainers for this Matter.jsx
const Matter = (props) => (
  <div className='matter'>
    <div>Title :{props.title}</div>
    <div>Internal Reference Id :{props.internalMatterNumber}</div>
    <div>Category:{props.category}</div>
    <div>Details:{props.details}</div>
  </div>
)

export default Matter
