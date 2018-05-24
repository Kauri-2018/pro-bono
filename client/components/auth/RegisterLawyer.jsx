import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ReCAPTCHA from 'react-google-recaptcha'

import {registerUser} from '../../actions/register'
import {showSnackbar} from '../../actions/snackbar'
import {getLawCentres} from '../../actions/lawcentres'

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
      role: 'lawyer',
      timeCommitment: 0,
      remoteWork: null,
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

  componentDidMount () {
    this.props.dispatch(getLawCentres())
  }

  onChange (value) {
    captcha = true
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
      if (this.state.confirmPassword.length >= 7 &&
        this.state.password !== this.state.confirmPassword) this.setState({confPasswordError})
      else this.setState({confPasswordError: ''})
      if (this.state.email.length > 5 && !this.isEmailAddress(this.state.email)) this.setState({emailError})
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
    if (this.state.password !== this.state.confirmPassword ||
       this.state.password.length < 7 ||
       !this.isEmailAddress(this.state.email) ||
       !captcha) {
      return
    }

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      company: this.state.company,
      centreId: this.state.centreId
    }

    this.props.dispatch(registerUser(
      this.state.email,
      this.state.password,
      this.state.role,
      newUser))
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
      <div className='new-matter-wrapper'>
        <Card position="static" color="default" className="register">
          <h1 className="center-text red-text title-text">Register</h1>
          <form onSubmit={() => { captcha.execute() }}>
            <section className="form-field">
              <span className='push-apart'>
                <span>
                  First Name:
                </span>
                <TextField
                  required={true}
                  placeholder="First Name"
                  name="firstName"
                  className="TextField-right register-title"
                  onChange={this.handleChange}
                  margin="normal"
                />
              </span>
              <br/>
              <span className='push-apart'>
                <span>
                  Last Name:
                </span>
                <TextField
                  required={true}
                  placeholder="Last Name"
                  name="lastName"
                  className="TextField-right register-title"
                  onChange={this.handleChange}
                  margin="normal"
                />
              </span>
              <br/>
              <span className='push-apart'>
                <span>
                  Email:
                </span>
                <TextField
                  required={true}
                  placeholder="Email"
                  name="email"
                  className="TextField-right register-title"
                  onChange={this.handleChange}
                  margin="normal"
                  error={!!this.state.emailError}
                  label={this.state.emailError}
                />
              </span>

              <br/>
              <span className='push-apart'>
                <span>
                  Phone Number:
                </span>
                <TextField
                  required={true}
                  placeholder="Phone Number"
                  name="phoneNumber"
                  className="TextField-right register-title"
                  onChange={this.handleChange}
                  margin="normal"
                />
              </span>
              <br/>
              <span className='push-apart'>
                <span>
                  Company:
                </span>
                <TextField
                  required={true}
                  placeholder="Company"
                  name="company"
                  className="TextField-right register-title"
                  onChange={this.handleChange}
                  margin="normal"
                />
              </span>
              <br/>
              <span className='push-apart'>
                <span>
                  Local Community Law Centre:
                </span>
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
                  {this.props.lawcentres.map(lawcentre =>
                    <MenuItem key={lawcentre.lawcentreId} onClick={ e => { this.handleClose(e, lawcentre.lawcentreId) }}>
                      {lawcentre.name}
                    </MenuItem>
                  )}
                </Menu>
              </span>
              <br />
              <span className='push-apart'>
                <span>
                  Password:
                </span>
                <TextField
                  required={true}
                  placeholder="Password"
                  type="password"
                  name="password"
                  className="TextField-right register-title"
                  onChange={this.handleChange}
                  margin="normal"
                  error={!!this.state.passwordError}
                  label={this.state.passwordError}
                />
              </span>
              <br/>
              <span className='push-apart'>
                <span>
                  Confirm Password:
                </span>
                <TextField
                  required={true}
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  className="TextField-right register-title"
                  onChange={this.handleChange}
                  margin="normal"
                  error={!!this.state.confPasswordError}
                  label={this.state.confPasswordError}
                />
              </span>
            </section>
            <section>
              <br/>
              <ReCAPTCHA
                className='center-horizontally'
                ref="recaptcha"
                sitekey="6Lf4QFkUAAAAAFFvtEdYhoMyHL72NxOxbJwaaUcs"
                onChange={this.onChange}
              />
              <br/>
              <Button
                variant="raised"
                color="primary"
                className="btn-submit offset-by-four columns four columns "
                type="submit"
                onClick={this.handleAdd}>
                Submit
              </Button>
            </section>
          </form>

        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // storedMatters: state.matterList.matters,
    lawcentres: state.lawcentres
  }
}

export default connect(mapStateToProps)(Register)
