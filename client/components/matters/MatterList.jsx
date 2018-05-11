// Contains accordion of MatterListItems
import React from 'react'
import {connect} from 'react-redux'
import {getLiveMatters} from '../../actions/matters'

import MatterListItem from './MatterListItem'

class MatterList extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.dispatch(getLiveMatters())
  }

  render () {
    return (
      <div className='matterList'>
        {this.props.liveMatters.length ?
          this.props.liveMatters.map(matter => 
            <MatterListItem
            key={matter.referenceNumber}
            matter={matter}
            />
            ) :
          <h4>No Live Matters</h4>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
   liveMatters: state.matterList
  }
}

export default connect(mapStateToProps)(MatterList)

