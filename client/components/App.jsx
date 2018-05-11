// Boilerplate
import React from 'react'

import Navbar from './Navbar'
import Login from './auth/Login'
import Lawyer from './users/Lawyer'
import NewMatter from './matters/NewMatter'
import ApproveProfiles from './users/ApproveProfiles'

const App = () => {
  return (
    <div className='app container'>
      <Navbar />
      <Login />
      <Lawyer matterId={550001}/>
      <NewMatter />
      <ApproveProfiles />
    </div>
  )
}

export default App
