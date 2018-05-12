import React from 'react'

import LawyerMatter from './LawyerMatter'

const MatterListItem = ({matter, handleClaim, handleExpand, expanded}) => (
  <LawyerMatter
    singleMatter={matter}
    handleClaim = {handleClaim}
    handleExpand = {handleExpand}
    expanded = {expanded}
  />
)

export default MatterListItem
