import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
// import Typography from '@material-ui/core/Typography'

import NewMatter from '../matters/NewMatter'
import ApproveProfiles from './ApproveProfiles'
import MemberMatterList from '../matters/MemberMatterList'
import {getMatterById} from '../../actions/matters'
import {logoutUser} from '../../actions/logout'

class MemberSection extends React.Component {
  constructor (props) {
    super(props)
    if (!this.props.isAuthenticated) {
      this.props.history.push('/')
    } else if (this.props.pending) {
      this.props.history.push('/pending')
    }
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
      <div className='section-wrapper row'>
        <AppBar>
          <Tabs value={selectedTabIndex} onChange={this.switchTab}>
            <Tab label="Create New Matter" />
            <Tab label="Search Matters" />
            <Tab label="Approve Users" disabled={!isAdmin} />
            <Tab label="Log out" onClick={() => {
              this.props.dispatch(logoutUser())
              this.props.history.push('/')
            }}/>
          </Tabs>
        </AppBar>
        <div className='member-section-wrapper row'>
          {selectedTabIndex === 0 && <NewMatter key='newmatter'/>}
          {selectedTabIndex === 1 && <MemberMatterList key='MemberMatterList'/>}
          {selectedTabIndex === 2 && <ApproveProfiles key='ApproveProfiles'/>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth && state.auth.user && state.auth.user.role === 'admin',
    matterById: state.matterById,
    isAuthenticated: state.auth.isAuthenticated,
    pending: state.auth.user ? state.auth.user.pending : 1
  }
}

export default connect(mapStateToProps)(withRouter(MemberSection))
