import React from 'react'

import MemberMatter from './MemberMatter'

const MemberMatterListItem = ({matter, handleClaim, handleExpand, expanded}) => (
  <MemberMatter
    singleMatter={matter}
    handleClaim = {handleClaim}
    handleExpand = {handleExpand}
    expanded = {expanded}
  />
)

export default MemberMatterListItem
