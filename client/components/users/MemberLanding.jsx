import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import Tabs, {Tab} from 'material-ui/Tabs'
// import Typography from 'material-ui/Typography'

import NewMatter from '../matters/NewMatter'
import ApproveProfiles from './ApproveProfiles'
import MemberMatterList from '../matters/MemberMatterList'
import {getMatterById} from '../../actions/matters'
import {logoutUser} from '../../actions/logout'

class MemberLanding extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTabIndex: 0
    }

    this.switchTab = this.switchTab.bind(this)
  }

  switchTab (e, selectedTabIndex) {
    this.setState({selectedTabIndex})
  }

  componentDidMount () {
    if (this.props.matterId) {
      this.props.dispatch(getMatterById(this.props.matterId))
    }
  }

  render () {
    const selectedTabIndex = this.state.selectedTabIndex
    const isAdmin = this.props.isAdmin
    return (
      <div className='member-landing'>
        <AppBar position='static'>
          <Tabs value={selectedTabIndex} onChange={this.switchTab}>
            <Tab label="New Matters" />
            <Tab label="See Matters" />
            <Tab label="Approve Users" disabled={!isAdmin} />
            <Tab label="Log out" onClick={() => {
              this.props.dispatch(logoutUser())
              this.props.history.push('/')
            }}/>
          </Tabs>
        </AppBar>
        {selectedTabIndex === 0 && <NewMatter key='newmatter'/>}
        {selectedTabIndex === 1 && <MemberMatterList key='MemberMatterList'/>}
        {selectedTabIndex === 2 && <ApproveProfiles key='ApproveProfiles'/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth && state.auth.user && state.auth.user.role === 'admin',
    matterById: state.matterById
  }
}

export default connect(mapStateToProps)(withRouter(MemberLanding))
