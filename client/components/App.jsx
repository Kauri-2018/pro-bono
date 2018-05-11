// Boilerplate
import React from 'react'

import Navbar from './Navbar'
import Lawyer from './users/Lawyer'
import NewMatter from './matters/NewMatter'

const App = () => {
  return (
    <div className='app container'>
      <Navbar />
      <Lawyer matterId={550001}/>
      <NewMatter />
    </div>
  )
}

export default App
