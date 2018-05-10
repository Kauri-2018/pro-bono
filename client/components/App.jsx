// Boilerplate
import React from 'react'

import Navbar from './Navbar'
import Matter from './matters/Matter'

const App = () => {
  return (
    <div>
      <Navbar />
      <Matter title={'Example title'} internalMatterNumber= {999}
        category={'civil'} details={'a thing happened'} />
    </div>
  )
}

export default App
