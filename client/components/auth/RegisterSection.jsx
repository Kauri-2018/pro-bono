// Contains 2 buttons for registering as lawyer or law centre member
import React from 'react'
import {Link} from 'react-router-dom'

const RegisterSection = () => {
  return (
    <div>
      <Link to='/lawyer/register'><button>Register as a Lawyer</button></Link>
      <Link to='/member/register'><button>Register as a Community Law Centre Member</button></Link>
    </div>
  )
}

export default RegisterSection
