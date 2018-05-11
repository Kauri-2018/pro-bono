import React from 'react'

// parents coming through from different containers for this Matter.jsx
const Matter = (props) => (
  <div className='matter'>
    <div>Title :{props.singleMatter.title}</div>
    <div>Internal Reference Id :{props.singleMatter.internalMatterNumber}</div>
    <div>Category:{props.singleMatter.category}</div>
    <div>Details:{props.singleMatter.details}</div>
  </div>
)

export default Matter
