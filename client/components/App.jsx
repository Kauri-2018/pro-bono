// Boilerplate
import React from 'react'

import Navbar from './Navbar'
import Matter from './matters/Matter'
import NewMatter from './matters/NewMatter'
import CssBaseline from 'material-ui/CssBaseline'

const App = () => {
  return (
    <div className='app container'>
      <CssBaseline />
      <Navbar />
      <Matter title={'Example title'} internalMatterNumber= {999}
        category={'civil'} details={'a thing happened'} />
      <NewMatter />
    </div>
  )
}

export default App
