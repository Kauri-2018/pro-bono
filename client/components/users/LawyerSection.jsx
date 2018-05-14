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
import {getLiveMatters, getIncompleteMattersByProfileId, getCompleteMattersByProfileId} from '../../actions/matters'
import {claimMatter, releaseMatter} from '../../apiClient'

class LawyerSection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTabIndex: 0
    }

    this.handleClaimMatter = this.handleClaimMatter.bind(this)
    this.handleReleaseMatter = this.handleReleaseMatter.bind(this)
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

  handleClaimMatter (getMattersFunction, matterId) {
    claimMatter(matterId, this.props.currentUser.profileId)
      .then(() => {
        this.props.dispatch(getMattersFunction(this.props.currentUser.profileId))
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  handleReleaseMatter (getMattersFunction, matterId) {
    releaseMatter(matterId, this.props.currentUser.profileId)
      .then(() => {
        this.props.dispatch(getMattersFunction(this.props.currentUser.profileId))
      })
      .catch(err => {
        console.log(err.message)
      })
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
            <Tab label="Your Completed Matters" />
          </Tabs>
        </AppBar>
        {selectedTabIndex === 0 && <LawyerMatterList
          key="claimedMatterList" buttonData={undefined}
          getMattersFunction={getIncompleteMattersByProfileId}
          />}
        {selectedTabIndex === 1 && <LawyerMatterList
          key="liveMatterList"
          buttonData={[{text: "Claim", fn: this.handleClaimMatter}]}
          getMattersFunction={getLiveMatters}
          />}
        {selectedTabIndex === 2 && <LawyerMatterList
          key="completedMatterList"
          getMattersFunction={getCompleteMattersByProfileId}
          />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    matterById: state.matterById,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(withRouter(LawyerSection))
