// Boilerplate
import React from 'react'
import {connect} from 'react-redux'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import {loginUser} from '../../actions/login'
// import ErrorMessage from './ErrorMessage'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  handleClick () {
    const {username, password} = this.state
    const creds = {
      username: username.trim(),
      password: password.trim()
    }
    this.props.loginUser(creds)
  }

  render () {
    return (
      <div className='new-matter-wrapper offset-by-two column eight columns'>
        <Card position="static" color="default" className="new-matter">
          <h1 className="offset-by-four columns">LOGIN</h1>
          <div>
            <p>
            Username <TextField fullWidth={true} required={true} placeholder="username" name="username" className="text-input" onChange={this.handleChange} margin="normal" />
            </p>
            <p>
            Password <TextField fullWidth={true} required={true} type="password" placeholder="Password" name="Password" className="text-input" onChange={this.handleChange} margin="normal" />
            </p>
            <div>
              <Button variant="raised" color="primary" className="btn-submit offset-by-four columns four columns " onClick={this.submitNewMatter}>Login</Button>
            </div>
          </div>
          {/* <ErrorMessage reducer='auth' /> */}
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

export default connect(null, mapDispatchToProps)(Login)
