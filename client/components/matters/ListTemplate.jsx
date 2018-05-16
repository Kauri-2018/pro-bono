// Modules
import React from 'react'
import {connect} from 'react-redux'

// Material UI Components
// import classNames from 'classnames'
// import TextField from '@material-ui/core/TextField'

// Our Modules and Components
// import { listStyles } from '../../constants'
// import {getLiveMatters} from '../../actions/matters'
// import {claimMatter} from '../../apiClient'

/**
 * EXTEND THIS CLASS IF YOU WANT A LIST DO NOT COPY IT
 */
class ListTemplate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filters: {},
      expanded: false
    }

    this.handleExpand = this.handleExpand.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
    this.applyFilters = this.applyFilters.bind(this)
  }

  handleExpand (panel) {
    return (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false
      })
    }
  }

  changeFilter (e) {
    const newFilters = {...this.state.filters}
    newFilters[e.target.name] = {
      regex: new RegExp(e.target.value.toLowerCase()),
      field: e.target.name
    }
    this.setState({
      filters: newFilters
    })
  }

  applyFilters (itemArray) {
    const filterArray = Object.values(this.state.filters)

    return itemArray.filter(item => {
      return !filterArray.reduce((foundNotMatching, filter) => {
        return foundNotMatching || !filter.regex.test(('' + item[filter.field])
          .toLowerCase())
      }, false)
    })
  }

  render () {
    return (
      <div className='list-wrapper center-vertically row'>
        <div >
          {this.renderFilters()}
        </div>
        <br />
        <div>
          {this.renderList()}
        </div>
      </div>
    )
  }

  renderFilters () {

  }

  renderList () {

  }
}

export default ListTemplate
