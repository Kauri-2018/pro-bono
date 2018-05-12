import React from 'react'

import MemberMatter from './MemberMatter'

const MemberMatterListItem = ({matter, handleClose, handleExpand, expanded}) => (
  <MemberMatter
    singleMatter={matter}
    handleClose = {handleClose}
    handleExpand = {handleExpand}
    expanded = {expanded}
  />
)

export default MemberMatterListItem
