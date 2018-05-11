// renders 'Profiles' waiting for approval:'
  import React from 'react'
  import {connect} from 'react-redux'
  import {action} from '../../actions/profiles'

  import ProfileList from './ProfileList'

class ApproveProfile extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount () {
    this.props.dispatch(getPendingProfiles())
  }

  Render () {
    return (
      <div>haiiiii</div>
    )
  }
}

export default connect()(ApproveProfile)