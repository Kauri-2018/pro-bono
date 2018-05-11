// Boilerplate
import React from 'react'

import Navbar from './Navbar'
import Lawyer from './users/Lawyer'
import NewMatter from './matters/NewMatter'
import MatterList from './matters/MatterList'

const App = () => {
  return (
    <div className='app container'>
      <Navbar />
      <Lawyer matterId={550001}/>
      <MatterList />
      <NewMatter />
    </div>
  )
}

export default App
