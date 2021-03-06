// Boilerplate
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {loginUser} from '../../actions/login'
import ErrorMessage from '../ErrorMessage'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick () {
    const {email, password} = this.state
    const creds = {
      email: email.trim(),
      password: password.trim()
    }
    this.props.loginUser(creds)
      .then(userInfo => {
        if (userInfo.pending) {
          this.props.history.push(`/pending`)
        } else {
          this.props.history.push(`/${userInfo.role}`)
        }
      })
  }

  render () {
    return (
      <div className='new-matter-wrapper'>
        <Card position="static" color="default" className="login">
          <h3 className="center-text title-text red-text">LOGIN</h3>
          <section>
            <span>
              <span className='title-text'>
                Email
              </span>
              <TextField
                fullWidth={true}
                required={true}
                placeholder="email"
                name="email"
                className="text-TextField"
                onChange={this.handleChange}
                margin="normal"
              />
            </span>
            <br/><br/>
            <span>
              <span className='title-text'>
                Password
              </span>
              <TextField
                fullWidth={true}
                required={true}
                type="password"
                placeholder="Password"
                name="password"
                className="text-TextField"
                onChange={this.handleChange}
                margin="normal"
              />
            </span>
            <br/><br/>
            <section>
              <Button
                variant="raised"
                color="primary"
                className="btn-submit offset-by-four columns four columns "
                onClick={this.handleClick}
              >
              Login
              </Button>
            </section>
          </section>
          <ErrorMessage reducer='auth' />
        </Card>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: creds => {
      return dispatch(loginUser(creds))
    }
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Login))
