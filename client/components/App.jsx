// Boilerplate
import React from 'react'

import Navbar from './Navbar'
// import Matter from './matters/Matter'
import Login from './auth/Login'
import NewMatter from './matters/NewMatter'

const App = () => {
  return (
    <div className='app container'>
      <Navbar />
      {/* <Matter title={'Example title'} internalMatterNumber= {999}
        category={'civil'} details={'a thing happened'} /> */}
      <Login />
      <NewMatter />
    </div>
  )
}

export default App
