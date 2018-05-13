import React from 'react'
import {connect} from 'react-redux'
import {getMatterById} from '../../actions/matters'
import { withRouter } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import Tabs, {Tab} from 'material-ui/Tabs'
// import Typography from 'material-ui/Typography'

import ApproveProfiles from './ApproveProfiles'
import LawyerMatterList from '../matters/LawyerMatterList'
import ActiveMatter from '../matters/ActiveMatter'
import MatterList from '../matters/MatterList'
import NewMatter from '../matters/NewMatter'
import {getLiveMatters, getMattersByProfileId} from '../../actions/matters'

class LawyerSection extends React.Component {
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

  componentWillMount () {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  render () {
    const selectedTabIndex = this.state.selectedTabIndex
    const isAdmin = this.props.isAdmin
    return (
      <div className='member-landing'>
        <AppBar position='static'>
          <Tabs value={selectedTabIndex} onChange={this.switchTab}>
            <Tab label="Your Active Matters" />
            <Tab label="Browse Unclaimed Matters" />
          </Tabs>
        </AppBar>
        {selectedTabIndex ? 
          <LawyerMatterList key="liveMatterList" showClaimButton={true} getMattersFunction={getLiveMatters}/> :
          <LawyerMatterList key="claimedMatterList" showClaimButton={false} getMattersFunction={getMattersByProfileId}/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth && state.auth.user && state.auth.user.role === 'admin',
    matterById: state.matterById,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(withRouter(LawyerSection))
