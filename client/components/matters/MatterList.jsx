// Modules
import React from 'react'
import {connect} from 'react-redux'

// Material UI Components
import TextField from 'material-ui/TextField'

// Our Components
import {getLiveMatters} from '../../actions/matters'
import {claimMatter} from '../../apiClient'
import MatterListItem from './MatterListItem'

class MatterList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
      idFilter: new RegExp(''),
      categoryFilter: new RegExp('')
    }

    this.handleClaim = this.handleClaim.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
  }

  changeFilter (e) {
    this.setState({
      [e.target.name]: new RegExp(e.target.value.toLowerCase())
    })
  }

  handleClaim (matterId) {
    claimMatter(matterId, this.props.claimedById)
      .then(() => {
        this.props.dispatch(getLiveMatters())
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  handleExpand (panel) {
    return (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false
      })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  componentDidMount () {
    this.props.dispatch(getLiveMatters())
  }

  render () {
    return (
      <div className='matter-list-wrapper'>
        Reference ID: <TextField
          className='input-left'
          name="idFilter"
          margin="normal"
          onChange={this.changeFilter}
        />
        Category: <TextField
          className='input-left'
          name="categoryFilter"
          margin="normal"
          onChange={this.changeFilter}
        />
        <br />
        {this.props.liveMatters.length
          ? this.props.liveMatters.filter(matter => 
              this.state.idFilter.test(matter.referenceNumber)
              && this.state.categoryFilter.test(matter.category.toLowerCase())
            )
            .map(matter =>
              <MatterListItem
                key={matter.referenceNumber}
                matter={matter}
                handleClaim = {this.handleClaim}
                handleExpand = {this.handleExpand}
                expanded = {this.state.expanded === matter.referenceNumber}
              />
            )
          : <h4>No Live Matters</h4>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    liveMatters: state.matterList,
    claimedById: state.auth.user.id
  }
}

export default connect(mapStateToProps)(MatterList)
