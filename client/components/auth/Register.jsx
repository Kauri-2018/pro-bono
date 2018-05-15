import React from 'react'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Menu, { MenuItem } from 'material-ui/Menu'
import ReCAPTCHA from 'react-google-recaptcha'

import {registerUser} from '../../actions/register'
import {showSnackbar} from '../../actions/snackbar'

const passwordError = 'Must be at least 7 characters long'
const confPasswordError = 'Must match password'
const emailError = 'Please enter a valid email address'
let captcha = false

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      centreId: 0,
      centreName: '',
      company: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      confPasswordError,
      anchorEl: null,
      emailError: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.isEmailAddress = this.isEmailAddress.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(value) {
    captcha=true
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

  handleClick (e) {
    this.setState({
      anchorEl: e.currentTarget
    })
  }

  handleClose (e, centreId) {
    this.setState({
      anchorEl: null,
      centreId: centreId,
      centreName: e.target.textContent
    })
  }

  handleAdd (e) {
    e.preventDefault()
    if (this.state.password !== this.state.confirmPassword || this.state.password.length < 7 || !this.isEmailAddress(this.state.email) || !captcha) {
      return
    }

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      company: this.state.company,
      centreId: this.state.centreId
    }

    this.props.dispatch(registerUser(this.state.email, this.state.password, this.props.match.params.type, newUser))
      .then(userInfo => {
        if (userInfo) {
          this.props.history.push('/pending')
          this.props.dispatch(showSnackbar('Thank you for registering'))
        }
      })
  }

  render () {
    const anchorEl = this.state.anchorEl
    const centreId = this.state.centreId
    const centreName = this.state.centreName
    return (
      <div className='new-matter-wrapper offset-by-two column eight columns'>
        <Card position="static" color="default" className="register">
          <h1 className="offset-by-two columns">Register</h1>
          <form onSubmit={() => { captcha.execute(); }}>
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

            {this.props.match.params.type === 'member'
              ? <div>
                <span className='submit-matter-headings'>Community law centre</span>
                <Button
                  className='lawcentre-dropdown'
                  fullWidth={true}
                  required={true}
                  aria-owns={anchorEl ? 'lawcentre-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}>
                  {centreId ? `Centre: ${centreName}` : 'Select your centre'}
                </Button>
                <Menu
                  id="lawcentre-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={e => { this.handleClose(e, centreId) }}>
                  <MenuItem onClick={ e => { this.handleClose(e, 110001) }}>Auckland (CBD)</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110002) }}>Auckland (Māngere)</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110003) }}>Auckland (South)</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110004) }}>Auckland (Waitematā)</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110005) }}>Auckland Disability Law</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110006) }}>Blenheim</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110007) }}>Canterbury and West Coast</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110008) }}>Gisborne and Wairoa</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110009) }}>Hawkes Bay</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110010) }}>Māori Land</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110011) }}>Nelson Bays</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110012) }}>Otago</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110013) }}>Manawatū</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110014) }}>Porirua</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110015) }}>Rotorua</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110016) }}>Southland</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110017) }}>Taranaki</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110018) }}>Tauranga and Whakatāne</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110019) }}>Waikato</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110020) }}>Wairarapa</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110021) }}>Wellington and Hutt Valley</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110022) }}>Whanganui</MenuItem>
                  <MenuItem onClick={ e => { this.handleClose(e, 110023) }}>Taitokerau</MenuItem>
                </Menu>
                <br />
              </div>
              : <div>
                <span>Company:  <TextField required={true} placeholder="Company" name="company" className="TextField-right" onChange={this.handleChange} margin="normal" /></span>
                <br/>
              </div>
            }
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
          <ReCAPTCHA
            ref="recaptcha"
            sitekey="6Lf4QFkUAAAAAFFvtEdYhoMyHL72NxOxbJwaaUcs"
            onChange={this.onChange}
          />
            <Button variant="raised" color="primary" className="btn-submit offset-by-four columns four columns " type="submit" onClick={this.handleAdd}>Submit</Button>
      </section>
  </form>

        </Card>
      </div>
    )
  }
}

export default connect()(Register)
