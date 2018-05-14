import React from 'react'

import LawyerMatter from './LawyerMatter'

const MatterListItem = ({matter, buttonData, handleExpand, expanded, getMattersFunction}) => (
  <LawyerMatter
    singleMatter={matter}
    buttonData={buttonData}
    handleExpand={handleExpand}
    expanded={expanded}
    getMattersFunction = {getMattersFunction}
  />
)

export default MatterListItem
