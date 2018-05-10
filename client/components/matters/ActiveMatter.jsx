// renders
// 'Your active matter'
// Matter.jsx
// 'Please contact the above law centre for extra information'

import React from 'react'

import {} from '../../actions/matters'

const Matter = ({propsFromParent}) => (
  <div className='matter'>
    <div>Title :{propsFromParent.title}</div>
    <div>Reference No. :{propsFromParent.referenceNumber}</div>
    <div>Contact Email:{propsFromParent.contactEmail}</div>
    <div>Category:{propsFromParent.category}</div>
    <div>Details:{propsFromParent.details}</div>
  </div>
)

export default Matter
