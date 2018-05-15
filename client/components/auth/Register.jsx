import React from 'react'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'

import {registerUser} from '../../actions/register'

const passwordError = 'Must be at least 7 characters long'
const confPasswordError = 'Must match password'
const emailError = 'Please enter a valid email address'

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
      confPasswordError,
      emailError: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.isEmailAddress = this.isEmailAddress.bind(this)
  }

  isEmailAddress (str) {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(str) // returns a boolean
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      if (this.state.password.length < 7) this.setState({passwordError})
      else this.setState({passwordError: ''})
      if (this.state.confirmPassword.length >= 7 && this.state.password !== this.state.confirmPassword) this.setState({confPasswordError})
      else this.setState({confPasswordError: ''})
      if (!this.isEmailAddress(this.state.email)) this.setState({emailError})
      else this.setState({emailError: ''})
    })
  }

  handleAdd (e) {
    if (this.state.password !== this.state.confirmPassword || this.state.password.length < 7 || !this.isEmailAddress(this.state.email)) {
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
          this.props.history.push('/pending')
        }
      })
  }

  render () {
    return (
      <div className='new-matter-wrapper offset-by-two column eight columns'>
        <Card position="static" color="default" className="register">
          <h1 className="offset-by-two columns">Register</h1>
          <section className="form-field">
            <span>First Name:  <TextField required={true} placeholder="First Name" name="firstName" className="TextField-right" onChange={this.handleChange} margin="normal" /></span>
            <br/>
            <span>Last Name:  <TextField required={true} placeholder="Last Name" name="lastName" className="TextField-right" onChange={this.handleChange} margin="normal" /></span>
            <br/>
            <span>Email:  <TextField
              required={true}
              placeholder="Email"
              name="email"
              className="TextField-right"
              onChange={this.handleChange}
              margin="normal"
              error={!!this.state.emailError}
              label={this.state.emailError} />
            </span>

            <br/>
            <span>Phone Number:  <TextField required={true} placeholder="Phone Number" name="phoneNumber" className="TextField-right" onChange={this.handleChange} margin="normal" /></span>
            <br/>
            <span>Company:  <TextField required={true} placeholder="Company" name="company" className="TextField-right" onChange={this.handleChange} margin="normal" /></span>
            <br/>
            <span>Password:  <TextField
              required={true}
              placeholder="Password"
              type="password"
              name="password"
              className="TextField-right"
              onChange={this.handleChange}
              margin="normal"
              error={!!this.state.passwordError}
              label={this.state.passwordError} /></span>
            <br/>
            <span>Confirm Password:  <TextField
              required={true}
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              className="TextField-right"
              onChange={this.handleChange}
              margin="normal"
              error={!!this.state.confPasswordError}
              label={this.state.confPasswordError} /></span>
          </section>
          <section>
            <Button variant="raised" color="primary" className="btn-submit offset-by-four columns four columns " type="submit" onClick={this.handleAdd}>Submit</Button>
          </section>
        </Card>
      </div>
    )
  }
}

export default connect()(Register)
