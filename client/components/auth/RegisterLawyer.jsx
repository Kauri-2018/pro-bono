import React from 'react'
import {connect} from 'react-redux'

// Material UI Components
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import InputAdornment from '@material-ui/core/InputAdornment'
import ReCAPTCHA from 'react-google-recaptcha'

import {registerUser} from '../../actions/register'
import {showSnackbar} from '../../actions/snackbar'
import {getLawCentres} from '../../actions/lawcentres'

const passwordError = 'Must be at least 7 characters long'
const confPasswordError = 'Must match password'
const emailError = 'Please enter a valid email address'
let captcha = false

const styles = {
  block: {
    maxWidth: 100
  },
  checkbox: {
    marginBottom: 0
  }
}

const ranges = [
  {
    value: '0-5',
    label: '0 to 5'
  },
  {
    value: '5-10',
    label: '5 to 10'
  },
  {
    value: '10-15',
    label: '10 to 15'
  },
  {
    value: '15-20',
    label: '15 to 20'
  },
  {
    value: '20-30',
    label: '20 to 30'
  }
]

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
      timeCommitment: '',
      workRemote: null,
      password: '',
      confirmPassword: '',
      passwordError: '',
      confPasswordError,
      selectLawCentre: null,
      selectRemoteWork: null,
      emailError: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleLawCentreClose = this.handleLawCentreClose.bind(this)
    this.handleWorkRemoteClose = this.handleWorkRemoteClose.bind(this)
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

  handleClick (e, attribute) {
    this.setState({
      [attribute]: e.currentTarget
    })
  }

  handleLawCentreClose (e, centreId) {
    this.setState({
      selectLawCentre: null,
      centreId: centreId,
      centreName: e.target.textContent
    })
  }

  handleWorkRemoteClose (e, workRemote) {
    this.setState({
      selectRemoteWork: null,
      workRemote: workRemote
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
    const selectLawCentre = this.state.selectLawCentre
    const selectRemoteWork = this.state.selectRemoteWork
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
                  aria-owns={selectLawCentre ? 'lawcentre-menu' : null}
                  aria-haspopup="true"
                  onClick={(e) => { this.handleClick(e, 'selectLawCentre') }}>
                  {centreId ? `Centre: ${centreName}` : 'Select your centre'}
                </Button>
                <Menu
                  id="lawcentre-menu"
                  selectLawCentre={selectLawCentre}
                  open={Boolean(selectLawCentre)}
                  onClose={e => { this.handleLawCentreClose(e, centreId) }}>
                  {this.props.lawcentres.map(lawcentre =>
                    <MenuItem key={lawcentre.lawcentreId} onClick={ e => { this.handleLawCentreClose(e, lawcentre.lawcentreId) }}>
                      {lawcentre.name}
                    </MenuItem>
                  )}
                </Menu>
              </span>
              <br />
              <span className='push-apart'>Are you willing to work remotely?</span>
              <Paper>
                <Button
                  className='remotework-dropdown'
                  fullWidth={true}
                  required={true}
                  aria-owns={selectRemoteWork ? 'remotework-menu' : null}
                  aria-haspopup="true"
                  onClick={(e) => { this.handleClick(e, 'selectRemoteWork') }}>
                  {this.state.workRemote !== null ? (this.state.workRemote ? `Yes` : `No`) : 'Select your preference'}
                </Button>
              </Paper>
              <Menu
                id="workremote-menu"
                selectRemoteWork={selectRemoteWork}
                open={Boolean(selectRemoteWork)}
                onClose={e => { this.handleWorkRemoteClose(e, this.state.workRemote) }}>
                <MenuItem onClick={ e => { this.handleWorkRemoteClose(e, true) }}>Yes</MenuItem>
                <MenuItem onClick={ e => { this.handleWorkRemoteClose(e, false) }}>No</MenuItem>
              </Menu>
              <br />

              <span className='push-apart'>
                <span>
                  Approximately how many hours can you commit to pro bono work monthly?
                </span>
                <TextField
                  select
                  name="timeCommitment"
                  className="TextField-right register-title"
                  value={this.state.timeCommitment}
                  onChange={(e) => this.handleChange(e)}
                  margin="normal"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Hours</InputAdornment>
                  }}
                >
                  {ranges.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
    lawcentres: state.lawcentres
  }
}

export default connect(mapStateToProps)(Register)
