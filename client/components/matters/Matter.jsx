import React from 'react'

// parents coming through from differentcontainers for this Matter.jsx
const Matter = (propsFromParent) => (
  <div className='matter'>
    <div>Title :{propsFromParent.title}</div>
    <div>Internal Reference Id :{propsFromParent.internalMatterNumber}</div>
    <div>Category:{propsFromParent.category}</div>
    <div>Details:{propsFromParent.details}`</div>
  </div>
)

export default Matter
