import React from 'react'
import {connect} from 'react-redux'

import {LawyerListItem} from './LawyerListItem'

class LawyerList extends React.Component {
  render () {
    const listOfLawyers = this.props.listOfLawyers
    return (
      listOfLawyers.map(lawyer =>
        <LawyerListItem
          key={lawyer.id}
          {...lawyer}
        />
      )
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listOfLawyers: state.lawyers
  }
}

export default connect(mapStateToProps)(LawyerList)
