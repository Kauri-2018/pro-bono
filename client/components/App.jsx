// Boilerplate
import React from 'react'

import Navbar from './Navbar'
import ActiveMatter from './matters/ActiveMatter'
import NewMatter from './matters/NewMatter'

const App = () => {
  return (
    <div className='app container'>
      <Navbar />
      <ActiveMatter />
      <NewMatter />
    </div>
  )
}

export default App
