// If expanded = false
  // render <category> <title>
// else
  // render Matter.jsx and Claim button
  import React from 'react'

  import Matter from './Matter'

  const MatterListItem = ({matter}) => (
    <Matter singleMatter={matter} />
  )

  export default MatterListItem
