// Boilerplate
import React from 'react'

import Navbar from './Navbar'
import Lawyer from './users/Lawyer'
import NewMatter from './matters/NewMatter'
import {requestMatterById} from '../apiClient'

const App = () => {
  console.log(requestMatterById(550001))
  return (
    <div className='app container'>
      <Navbar />
      <Lawyer matterId={550001}/>
      <NewMatter />
    </div>
  )
}

export default App
