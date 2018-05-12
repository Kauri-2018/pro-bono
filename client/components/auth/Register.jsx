import React from 'react'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'

import {registerUser} from '../../actions/register'

const passwordError = 'Must be at least 7 characters long'
const confPasswordError = 'Must match password'

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      company: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      confPasswordError
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleChange (e) {
    
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      if (this.state.password.length < 7) this.setState({passwordError})
      else this.setState({passwordError: ''})
      if (this.state.confirmPassword.length >= 7 && this.state.password !== this.state.confirmPassword) this.setState({confPasswordError})
      else this.setState({confPasswordError: ''})
    })
  }

  handleAdd (e) {
    if (this.state.password !== this.state.confirmPassword || this.state.password.length < 7) {
      return
    }

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      company: this.state.company
    }

    this.props.dispatch(registerUser(this.state.email, this.state.password, this.props.match.params.type, newUser))
      .then(userInfo => {
        if (userInfo) {
          this.props.history.push('/' + userInfo.role)
        }
      })
  }

  render () {
    return (
      <div className='new-matter-wrapper offset-by-two column eight columns'>
        <Card position="static" color="default" className="register">
          <h1 className="offset-by-two columns">Register</h1>
          <div className="form-field">
            <p>First Name:  <TextField required={true} placeholder="First Name" name="firstName" className="input-right" onChange={this.handleChange} margin="normal" /></p>
            <br/>
            <p>Last Name:  <TextField required={true} placeholder="Last Name" name="lastName" className="input-right" onChange={this.handleChange} margin="normal" /></p>
            <br/>
            <p>Email:  <TextField required={true} placeholder="Email" name="email" className="input-right" onChange={this.handleChange} margin="normal" /></p>
            <br/>
            <p>Phone Number:  <TextField required={true} placeholder="Phone Number" name="phoneNumber" className="input-right" onChange={this.handleChange} margin="normal" /></p>
            <br/>
            <p>Company:  <TextField required={true} placeholder="Company" name="company" className="input-right" onChange={this.handleChange} margin="normal" /></p>
            <br/>
            <p>Password:  <TextField
              required={true}
              placeholder="Password"
              type="password"
              name="password"
              className="input-right"
              onChange={this.handleChange}
              margin="normal"
              error={!!this.state.passwordError}
              label={this.state.passwordError} /></p>
            <br/>
            <p>Confirm Password:  <TextField
              required={true}
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              className="input-right"
              onChange={this.handleChange}
              margin="normal"
              error={!!this.state.confPasswordError}
              label={this.state.confPasswordError} /></p>

          </div>
          <div>
            <Button variant="raised" color="primary" className="btn-submit offset-by-four columns four columns " type="submit" onClick={this.handleAdd}>Submit</Button>
          </div>
        </Card>
      </div>
    )
  }
}

export default connect()(Register)
