// Contains 2 buttons for registering as lawyer or law centre member
import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

const RegisterSection = () => {
  return (
    <div className='center-horizontally'>
      <Link to='/register/lawyer'><Button className="center register-btn" variant="raised">Register as a Lawyer</Button></Link>
      <span> </span>
      <Link to='/register/member'><Button className="center register-btn" variant="raised">Register as a Law Centre Member</Button></Link>
    </div>
  )
}

export default RegisterSection
