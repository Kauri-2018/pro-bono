// Node Packages
import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Material UI Components
import Snackbar from 'material-ui/Snackbar'

// Our Modules and Components
import Login from './auth/Login'
import LawyerSection from './users/LawyerSection'
import MemberSection from './users/MemberSection'
import RegisterSection from './auth/RegisterSection'
import Register from './auth/Register'
import EditMatter from './matters/EditMatter'
import PendingLanding from './auth/PendingLanding'

class App extends React.Component {
  render () {
    return (
      <Router>
        <div className='app container' >
          <Switch>
            <Route exact path='/pending' component={PendingLanding} />
            <Route exact path='/lawyer' component={LawyerSection} />
            <Route exact path='/member' component={MemberSection} />
            <Route exact path='/admin' component={MemberSection} />
            <Route exact path='/edit/:id' component={EditMatter} />
            <Route path='/:type/register' component={Register}/>
            <Route path='/' component={renderHome} />
          </Switch>
          <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            open={this.props.snackbar.open}
            ContentProps={{
              'aria-describedby': 'message-id',
              styles: this.props.snackbar.error
              ? {backgroundColor: '#b52545', color: '#b52545'}
              : {backgroundColor: '#b52545', color: '#b52545'}
            }}
            bodyStyle={this.props.snackbar.error
              ? {backgroundColor: '#b52545', color: '#b52545'}
              : {backgroundColor: '#b52545', color: '#b52545'}
            }
            message={<span id="message-id">{this.props.snackbar.message}</span>}
          />
        </div>
      </Router>
    )
  }
}

const renderHome = props => {
  return !props.user
    ? (<div>
      <Login />
      <RegisterSection />
    </div>)
    : <h1>You are already logged in</h1>
}

function mapStateToProps (state) {
  return {
    user: state.auth.user,
    snackbar: state.snackbar
  }
}

export default connect(mapStateToProps)(App)
