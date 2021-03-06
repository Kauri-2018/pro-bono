import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import LawyerMatterList from '../matters/LawyerMatterList'
import {getLiveMatters, getIncompleteMattersByProfileId, getCompleteMattersByProfileId} from '../../actions/matters'
import {logoutUser} from '../../actions/logout'
import {claimMatter, releaseMatter} from '../../apiClient'
import {showSnackbar} from '../../actions/snackbar'

class LawyerSection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTabIndex: 0
    }

    this.handleClaimMatter = this.handleClaimMatter.bind(this)
    this.handleReleaseMatter = this.handleReleaseMatter.bind(this)
    this.switchTab = this.switchTab.bind(this)

    if (!this.props.isAuthenticated) {
      this.props.history.push('/')
    } else if (this.props.pending) {
      this.props.history.push('/pending')
    }
  }

  switchTab (e, selectedTabIndex) {
    this.setState({selectedTabIndex})
  }

  handleClaimMatter (getMattersFunction, matterId) {
    claimMatter(matterId, this.props.currentUser.profileId)
      .then(() => {
        this.props.dispatch(getMattersFunction(this.props.currentUser.profileId))
        this.props.dispatch(showSnackbar(`Matter claimed`))
      })
      .catch(err => {
        this.props.dispatch(showSnackbar(err.message))
      })
  }

  handleReleaseMatter (getMattersFunction, matterId) {
    releaseMatter(matterId, this.props.currentUser.profileId)
      .then(() => {
        this.props.dispatch(getMattersFunction(this.props.currentUser.profileId))
        this.props.dispatch(showSnackbar(`Matter released`))
      })
      .catch(err => {
        this.props.dispatch(showSnackbar(err.message))
      })
  }

  render () {
    const selectedTabIndex = this.state.selectedTabIndex
    return (
      <div className='member-landing'>
        <AppBar >
          <Tabs value={selectedTabIndex} onChange={this.switchTab}>
            <Tab label="Your Active Matters" />
            <Tab label="Find New Matters" />
            <Tab label="Your Completed Matters" />
            <Tab label="Log out" onClick={() => {
              this.props.dispatch(logoutUser())
              this.props.history.push('/')
            }}/>
          </Tabs>
        </AppBar>
        <div className='section-wrapper'>
          {selectedTabIndex === 0 && <LawyerMatterList
            key="claimedMatterList"
            matters="claimed"
            buttonData={[{text: 'Unclaim', fn: this.handleReleaseMatter}]}
            getMattersFunction={getIncompleteMattersByProfileId}
          />}
          {selectedTabIndex === 1 && <LawyerMatterList
            key="liveMatterList"
            matters="live"
            buttonData={[{text: 'Claim', fn: this.handleClaimMatter}]}
            getMattersFunction={getLiveMatters}
          />}
          {selectedTabIndex === 2 && <LawyerMatterList
            key="completedMatterList"
            matters="completed"
            getMattersFunction={getCompleteMattersByProfileId}
          />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    matterById: state.matterById,
    isAuthenticated: state.auth.isAuthenticated,
    pending: state.auth.user ? state.auth.user.pending : 1
  }
}

export default connect(mapStateToProps)(withRouter(LawyerSection))
