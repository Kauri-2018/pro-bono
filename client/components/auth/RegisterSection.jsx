// Contains 2 buttons for registering as lawyer or law centre member
import React from 'react'
import {Link} from 'react-router-dom'

const RegisterSection = () => {
  return (
    <div>
      <Link to='/register/lawyer'><button>Register as Lawyer</button></Link>
      <Link to='/register/member'><button>Register as Community Law Centre Member</button></Link>
    </div>
  )
}

export default RegisterSection
