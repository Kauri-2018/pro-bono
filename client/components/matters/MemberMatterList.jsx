// Modules
import React from 'react'
import {connect} from 'react-redux'

// Material UI Components
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Input, {InputLabel, InputAdornment} from 'material-ui/Input'
import Icon from 'material-ui/Icon'

// Our Components
import {getIncompleteMatters} from '../../actions/matters'
import {closeMatter} from '../../apiClient'
import MemberMatterListItem from './MemberMatterListItem'

// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap'
//   },
//   margin: {
//     margin: theme.spacing.unit
//   },
//   textField: {
//     flexBasis: 200
//   }
// })

class MemberMatterList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
      refNumFilter: new RegExp(''),
      intNumFilter: new RegExp(''),
      categoryFilter: new RegExp('')
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
  }

  changeFilter (e) {
    this.setState({
      [e.target.name]: new RegExp(e.target.value.toLowerCase())
    })
  }

  handleClose (matterId) {
    closeMatter(matterId)
      .then(() => {
        this.props.dispatch(getIncompleteMatters())
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
    this.props.dispatch(getIncompleteMatters())
  }

  render () {
    return (
      <div className='matter-list-wrapper'>
        Reference number: <TextField
          className='input-left'
          name="refNumFilter"
          floatingLabelText="Reference number"
          margin="normal"
          onChange={this.changeFilter}
          endAdornment={(<InputAdornment position="end"><Icon>search</Icon></InputAdornment>)}
        />
        Internal matter number: <TextField
          className='input-left'
          name="intNumFilter"
          floatingLabelText="Internal matter number"
          margin="normal"
          onChange={this.changeFilter}
          // endAdornment={(<InputAdornment position="end"><Icon>search</Icon></InputAdornment>)}
        />
          Category: <TextField
          className='input-left'
          name="categoryFilter"
          label="Category"
          margin="normal"
          onChange={this.changeFilter}
        />
        <br />
        {this.props.incompleteMatters.length
          ? this.props.incompleteMatters.filter(matter =>
            this.state.refNumFilter.test(matter.referenceNumber) &&
            this.state.intNumFilter.test(matter.internalMatterNumber) &&
            this.state.categoryFilter.test(matter.category.toLowerCase())
          )
            .map(matter =>
              <MemberMatterListItem
                key={matter.referenceNumber}
                matter={matter}
                handleClose= {this.handleClose}
                handleExpand = {this.handleExpand}
                expanded = {this.state.expanded === matter.referenceNumber}
              />
            )
          : <h4>No Matters</h4>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    incompleteMatters: state.matterList
  }
}

export default connect(mapStateToProps)(MemberMatterList)
